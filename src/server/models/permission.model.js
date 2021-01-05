const mongoose = require("mongoose");

const Permission = mongoose.model(
  "Permission",
  new mongoose.Schema({
    name: String,
  })
);

module.exports = Permission;
