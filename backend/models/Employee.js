const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  position: {
    type: String,
    default: ''
  },

  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  },

  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    default: null
  },

  country: {
    type: String,
    default: ''
  },

  state: {
    type: String,
    default: ''
  },

  city: {
    type: String,
    default: ''
  }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
