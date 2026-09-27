const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true
  },  
  assignedSalesman: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Salesman'
  },
  savedMaterials: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Material'
  }]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);