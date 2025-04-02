const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth');
const File = require('../models/File');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
    const file = new File({
      userId: req.user.id,
      filename: req.file.filename,
      originalFilename: req.file.originalname,
      path: req.file.path,
    });
    await file.save();
    res.json(file);
  } catch (err) {
    console.error('File upload error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/myfiles', auth, async (req, res) => {
  try {
    const files = await File.find({ userId: req.user.id });
    res.json(files);
  } catch (err) {
    console.error('Get files error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ msg: 'File not found' });
    }
    if (file.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized to delete this file' });
    }

    const filePath = path.join(__dirname, '..', file.path);
    fs.unlink(filePath, (err) => {
      if (err) console.error('Error deleting file from disk:', err.message);
    });

    await file.deleteOne();
    res.json({ msg: 'File deleted successfully' });
  } catch (err) {
    console.error('Delete file error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/download/:id', auth, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ msg: 'File not found' });
    }
    if (file.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to download this file' }); // Changed to 401 for consistency
    }

    const filePath = path.join(__dirname, '..', file.path);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ msg: 'File not found on server' });
    }

    // Set headers to force download
    res.setHeader('Content-Disposition', `attachment; filename="${file.originalFilename}"`);
    res.setHeader('Content-Type', 'application/octet-stream'); // Generic binary type

    // Send the file
    res.sendFile(filePath);
  } catch (err) {
    console.error('Download file error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;