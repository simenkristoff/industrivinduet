const mongoose = require("mongoose");

const Role = mongoose.model(
  "Role",
  new mongoose.Schema(
    {
      name: String,
      group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
      },
    },
    { timestamps: true }
  )
);

module.exports = Role;
