const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    // unique: true,
    // lowercase: true,
    // trim: true
  },
  password: {
    type: String,
    required: [true, "Password required"]
  },
}, {
  timestamps: true,
});



const User = model("User", userSchema);

module.exports = User;
