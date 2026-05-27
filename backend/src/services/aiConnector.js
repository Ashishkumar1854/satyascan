const axios = require('axios');
const Report = require('../models/Report');

exports.analyzeInBackground = async (reportId, filePath) => {
  try {
    const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';
    
    // POST to AI service
    const response = await axios.post(`${aiServiceUrl}/analyze`, { filePath });
    
    const results = response.data;
    
    // Update MongoDB report with results
    await Report.findByIdAndUpdate(reportId, {
      status: 'complete',
      currentStep: 'building',
      trustScore: results.trustScore,
      summary: results.summary,
      claims: results.claims,
      searchProgress: { done: results.claims?.length || 0, total: results.claims?.length || 0 }
    });

  } catch (error) {
    console.error(`AI analysis failed for report ${reportId}:`, error.message);
    await Report.findByIdAndUpdate(reportId, {
      status: 'error',
      currentStep: 'parsing'
    });
  }
};
