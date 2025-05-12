const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileId: { type: mongoose.Schema.Types.ObjectId, ref: 'File' }, // Optional if not always linked
  filename: { type: String, required: true },
  questions: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Question', questionSchema);