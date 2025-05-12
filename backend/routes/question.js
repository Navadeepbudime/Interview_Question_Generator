const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const File = require('../models/File');
const authMiddleware = require('../middleware/auth');
const PDFDocument = require('pdfkit');

// Store questions from Flask
router.post('/store', authMiddleware, async (req, res) => {
  const { filename, questions } = req.body;
  try {
    if (!filename || !questions) {
      return res.status(400).json({ msg: 'Filename and questions are required' });
    }

    const file = await File.findOne({ originalFilename: filename, userId: req.user.id });
    
    const question = new Question({
      userId: req.user.id,
      fileId: file ? file._id : null,
      filename,
      questions,
    });
    await question.save();

    res.json({ questionId: question._id });
  } catch (err) {
    console.error('Store questions error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get question history
router.get('/myquestions', authMiddleware, async (req, res) => {
  try {
    const questions = await Question.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    console.error('Fetch questions error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Download questions as PDF
router.get('/download/:questionId', authMiddleware, async (req, res) => {
  try {
    const question = await Question.findById(req.params.questionId);
    if (!question || question.userId.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'Questions not found or unauthorized' });
    }

    const customName = req.query.customName || question.filename.replace(/\.[^/.]+$/, '');
    const filename = `questions-${customName}.pdf`;
    const doc = new PDFDocument();
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/pdf');

    doc.pipe(res);

    doc.fontSize(16).text('Generated Interview Questions', { align: 'center' });
    doc.moveDown();

    Object.entries(question.questions).forEach(([skill, questions]) => {
      doc.fontSize(14).text(`${skill}:`, { underline: true });
      doc.moveDown(0.5);
      questions.forEach((q, index) => {
        const text = `${index + 1}. ${q}`;
        const wrappedText = doc.fontSize(12).widthOfString(text) > 400 ? 
          doc.fontSize(12).text(text, { width: 400, align: 'justify' }) : 
          doc.fontSize(12).text(text);
        doc.moveDown(0.3);
      });
      doc.moveDown();
    });

    doc.end();
  } catch (err) {
    console.error('Download questions error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete a question entry
router.delete('/:questionId', authMiddleware, async (req, res) => {
  try {
    const question = await Question.findById(req.params.questionId);
    if (!question || question.userId.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'Question not found or unauthorized' });
    }

    await question.deleteOne();
    res.json({ msg: 'Question deleted successfully' });
  } catch (err) {
    console.error('Delete question error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;