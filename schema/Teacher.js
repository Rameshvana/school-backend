const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: String,
  gender: String,
  dob: Date,
  contactDetails: String,
  salary: Number,
  assignedClass: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
});

module.exports = mongoose.model('Teacher', teacherSchema);