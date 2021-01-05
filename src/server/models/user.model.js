const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      name: String,
      email: String,
      password: String,
      permissions: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Permission",
        },
      ],
    },
    { timestamps: true }
  )
);

module.exports = User;
