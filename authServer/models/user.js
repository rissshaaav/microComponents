const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    identifierString: {
      type: String,
      required: true,
      unique: true,
    },
    accessString: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
