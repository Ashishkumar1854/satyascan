const Report = require('../models/Report');
const aiConnector = require('../services/aiConnector');

exports.upload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { originalname, size, path: filePath } = req.file;

    const report = new Report({
      filename: originalname,
      fileSize: size,
      status: 'processing',
      currentStep: 'parsing',
      searchProgress: { done: 0, total: 0 }
    });

    await report.save();

    // Call AI connector in background (fire and forget)
    aiConnector.analyzeInBackground(report._id, filePath);

    res.status(202).json({ reportId: report._id });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Server error during upload' });
  }
};
