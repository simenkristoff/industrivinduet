const db = require("../models");
const PERMISSIONS = db.PERMISSIONS;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username already exists." });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email already exists." });
        return;
      }

      next();
    });
  });
};

checkPermissionsExisted = (req, res, next) => {
  if (req.body.permissions) {
    for (let i = 0; i < req.body.permissions.length; i++) {
      if (!PERMISSIONS.includes(req.body.permissions[i])) {
        res.status(400).send({
          message: `Failed! Permission ${req.body.permissions[i]} already exists.`,
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkPermissionsExisted,
};

module.exports = verifySignUp;
