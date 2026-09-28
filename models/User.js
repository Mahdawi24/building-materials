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
    type: Number
  },  
  assignedSalesman: {
    type: mongoose.Schema.Types.ObjectId
  },
  savedMaterials: [{
    type: mongoose.Schema.Types.ObjectId
  }]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);