const express = require('express');
const multer = require('multer');
const path = require('path');
const uploadController = require('../controllers/uploadController');
const reportController = require('../controllers/reportController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), uploadController.upload);
router.get('/ping', (req, res) => res.send('pong'));
router.get('/report/:id', reportController.getReport);
router.get('/report/:id/status', reportController.getStatus);
router.post('/report/:id/status', reportController.updateStatus);
router.get('/reports', reportController.getAllReports);
router.delete('/report/:id', reportController.deleteReport);

module.exports = router;
