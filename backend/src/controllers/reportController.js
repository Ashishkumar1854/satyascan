const Report = require('../models/Report');

exports.getReport = async (req, res) => {
  try {
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
    const report = await Report.findById(req.params.id, 'status currentStep searchProgress');
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    res.json({
      status: report.status,
      currentStep: report.currentStep,
      progress: report.searchProgress
    });
  } catch (error) {
    console.error('getStatus error:', error);
    res.status(500).json({ error: 'Server error fetching status' });
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
