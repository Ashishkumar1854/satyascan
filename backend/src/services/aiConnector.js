const axios = require('axios');
const Report = require('../models/Report');

exports.analyzeInBackground = async (reportId, filePath) => {
  try {
    const backendPort = process.env.PORT || 8899;
    const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:8001';
    const backendUrl = process.env.BACKEND_URL || `http://localhost:${backendPort}`;
    const callbackUrl = `${backendUrl}/api/report/${reportId}/status`;
    
    // POST to AI service
    const response = await axios.post(`${aiServiceUrl}/analyze`, { 
      filePath, 
      reportId: reportId.toString(),
      callback_url: callbackUrl
    });
    
    const results = response.data;
    const claims = results.claims || [];
    
    let verified = 0, inaccurate = 0, falseCount = 0;
    
    for (let c of claims) {
      if (c.status === 'VERIFIED') verified++;
      else if (c.status === 'INACCURATE') inaccurate++;
      else falseCount++;
    }
    
    const total = verified + inaccurate + falseCount;
    let trustScore = 0;
    if (total > 0) {
      trustScore = Math.round(((verified + (inaccurate * 0.5)) / total) * 100);
    }
    
    // Update MongoDB report with results
    await Report.findByIdAndUpdate(reportId, {
      status: 'complete',
      currentStep: 'building',
      trustScore,
      summary: { verified, inaccurate, false: falseCount, total },
      claims,
      searchProgress: { done: total, total }
    });

  } catch (error) {
    console.error(`AI analysis failed for report ${reportId}:`, error.message);
    await Report.findByIdAndUpdate(reportId, {
      status: 'error',
      currentStep: 'parsing'
    });
  }
};
