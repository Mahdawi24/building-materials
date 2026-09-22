const mongoose = require('mongoose');

const salesmanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: Number,
    required: true
  },
  assignedClients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Salesman', salesmanSchema);