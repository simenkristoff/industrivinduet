const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.options = require("./options.model");
db.user = require("./user.model");
db.permission = require("./permission.model");
db.group = require("./group.model");
db.role = require("./role.model");
db.member = require("./member.model");
db.event = require("./event.model");

db.PERMISSIONS = ["user", "admin", "moderator"];

module.exports = db;
