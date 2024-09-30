const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  className: String,
  year: Number,
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  studentFees: Number,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
});

module.exports = mongoose.model('Class', classSchema);