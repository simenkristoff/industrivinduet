const mongoose = require("mongoose");

const Member = mongoose.model(
  "Member",
  new mongoose.Schema(
    {
      name: String,
      email: String,
      role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    },
    { timestamps: true }
  )
);

module.exports = Member;
