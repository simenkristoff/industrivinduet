const db = require("../models");
const Group = db.group;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
    return;
  }

  const group = new Group({
    name: req.body.name,
  });

  group
    .save(group)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error has occured.",
      });
    });
};

exports.findAll = (req, res) => {
  Group.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error has occured.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Group.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Group with id=${id} could not be found.`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Group with id=${id}.`,
      });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty.",
    });
  }

  const id = req.params.id;

  Group.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Group with id=${id}. Maybe the Group was not found.`,
        });
      } else {
        res.send({
          message: "Group was updated!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating Group with id=${id}.`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Group.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Group with id=${id}. Maybe the Group was not found.`,
        });
      } else {
        res.send({
          message: "Group was deleted!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error deleting Group with id=${id}.`,
      });
    });
};

exports.deleteAll = (req, res) => {
  Group.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Groups were deleted.`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error occured while deleting all the Groups.",
      });
    });
};
