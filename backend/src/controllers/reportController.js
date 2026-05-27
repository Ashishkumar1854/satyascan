const Report = require('../models/Report');
const mongoose = require('mongoose');

exports.getReport = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ error: 'Report not found' });
    }
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    
    const reportObj = report.toObject();
    reportObj.id = reportObj._id;
    delete reportObj._id;
    delete reportObj.__v;

    if (reportObj.claims) {
      reportObj.claims = reportObj.claims.map(claim => {
        claim.id = claim._id;
        delete claim._id;
        return claim;
      });
    }

    res.json(reportObj);
  } catch (error) {
    console.error('getReport error:', error);
    res.status(500).json({ error: 'Server error fetching report' });
  }
};

exports.getStatus = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ error: 'Report not found' });
    }
    const report = await Report.findById(req.params.id, 'status currentStep searchProgress');
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    const response = {
      status: report.status,
      currentStep: report.currentStep,
    };
    if (report.status === 'processing' && report.currentStep === 'searching') {
      response.progress = report.searchProgress;
    } else {
      response.progress = report.searchProgress; // Keep for safety if frontend expects it
    }
    res.json(response);
  } catch (error) {
    console.error('getStatus error:', error);
    res.status(500).json({ error: 'Server error fetching status' });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ error: 'Report not found' });
    }
    const { step, progress } = req.body;
    const updateData = { currentStep: step };
    if (progress) {
      updateData.searchProgress = progress;
    }
    await Report.findByIdAndUpdate(req.params.id, updateData);
    res.json({ success: true });
  } catch (error) {
    console.error('updateStatus error:', error);
    res.status(500).json({ error: 'Server error updating status' });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find({}, '-claims').sort({ createdAt: -1 });
    const formattedReports = reports.map(r => {
      const obj = r.toObject();
      obj.id = obj._id;
      delete obj._id;
      delete obj.__v;
      return obj;
    });
    res.json(formattedReports);
  } catch (error) {
    console.error('getAllReports error:', error);
    res.status(500).json({ error: 'Server error fetching reports' });
  }
};
