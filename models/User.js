const mongoose = require("mongoose");

module.exports = router;
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
  phone:{
    type: Number,
    required: true
  },  
  assignedSalesman:{
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  savedMaterials:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "material"
  }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

module.exports = User;
