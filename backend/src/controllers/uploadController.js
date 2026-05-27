const Report = require('../models/Report');
const aiConnector = require('../services/aiConnector');

exports.upload = async (req, res) => {
  try {
    console.log('Upload endpoint hit');
    if (!req.file) {
      console.log('No file uploaded');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { originalname, size, path: filePath } = req.file;
    console.log('File details:', { originalname, size, filePath });

    const report = new Report({
      filename: originalname,
      fileSize: size,
      status: 'processing',
      currentStep: 'parsing',
      searchProgress: { done: 0, total: 0 }
    });

    console.log('Saving report to DB...');
    await report.save();
    console.log('Report saved with ID:', report._id);

    // Call AI connector in background (fire and forget)
    aiConnector.analyzeInBackground(report._id, filePath);
    console.log('Started analyzeInBackground');

    res.status(202).json({ reportId: report._id });
    console.log('Sent response');
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Server error during upload' });
  }
};
