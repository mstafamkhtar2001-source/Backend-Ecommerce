const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'accountant'],
    default: 'user'
  },
  lastlogin: {
    type: Date
  }
}, { timestamps: true }); // <-- السطر السحري ده بيضيف createdAt و updatedAt لوحدهم تلقائياً!

module.exports = mongoose.model('User', userSchema);