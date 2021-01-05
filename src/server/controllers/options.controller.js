const db = require("../models");
const Options = db.options;
const _ = require("lodash");

exports.get = (req, res) => {
  Options.findOne((err, data) => {
    if (err) {
      res.status(400).send({ message: err });
    }
    res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty.",
    });
  }

  Options.updateOne({}, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Options with id=${id}`,
        });
      } else {
        res.send({
          message: "Options was updated!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating Options.`,
      });
    });
};

exports.resetFields = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty.",
    });
  }

  const updateOptions = {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
  };

  // Reset fields from request-body to defaults from Schema
  const resetData = {};
  const fields = Options.schema.obj;
  _(req.body).forEach((value, key) => {
    resetData[key] = fields[key].default;
  });

  Options.updateOne({}, resetData, updateOptions)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Options with id=${id}`,
        });
      } else {
        res.send({
          message: "Options was updated!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating Options.`,
      });
    });
};

exports.resetToDefault = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty.",
    });
  }

  const updateOptions = {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
  };

  // Reset to defaults from Schema
  const resetData = {};
  _(Options.schema.obj).forEach((value, key) => {
    resetData[key] = value.default;
  });

  Options.updateOne({}, resetData, updateOptions)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Options with id=${id}`,
        });
      } else {
        res.send({
          message: "Options was updated!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating Options.`,
      });
    });
};
