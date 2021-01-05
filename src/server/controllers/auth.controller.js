const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Permission = db.permission;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.permissions) {
      Permission.find(
        {
          name: { $in: req.body.permissions },
        },
        (err, permissions) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.permissions = permissions.map((permission) => permission._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Permission.findOne({ name: "user" }, (err, permission) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.permissions = [permission._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .populate("permissions", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.permissions.length; i++) {
        authorities.push(
          "PERMISSION_" + user.permissions[i].name.toUpperCase()
        );
      }
      res.status(200).send({
        id: user._id,
        name: user.name,
        email: user.email,
        permissions: authorities,
        accessToken: token,
      });
    });
};
