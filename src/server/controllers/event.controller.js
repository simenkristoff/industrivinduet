const db = require("../models");
const Event = db.event;
const Member = db.member;

exports.create = async (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
    return;
  }

  const event = new Event({
    title: req.body.title,
    type: req.body.type,
    date: req.body.date,
    starttime: req.body.starttime,
    endtime: req.body.endtime,
    place: req.body.place,
    dining: req.body.dining,
    description: req.body.description,
    image: req.body.image,
  });

  event.save((err, event) => {
    Member.findOne({ _id: { $in: req.body.member } }, (err, member) => {
      if (err) {
        res.status(404).send({
          message: `Member with id=${req.body.member} could not be found.`,
        });
        return;
      }
      event.member = [member._id];
      event.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        res.send({ message: "Event was added successfully!" });
      });
    });
  });
};

exports.findAll = (req, res) => {
  Event.find()
    .populate({
      path: "member",
      populate: {
        path: "role",
        model: "Role",
      },
    })
    .exec((err, data) => {
      if (err) {
        res.status(400).send({ message: err });
      }
      res.send(data);
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Event.findById(id)
    .populate({
      path: "member",
      populate: {
        path: "role",
        model: "Role",
      },
    })
    .exec((err, data) => {
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

  const id = req.params.id;

  Event.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Event with id=${id}. Maybe the Event was not found.`,
        });
      } else {
        res.send({
          message: "Event was updated!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating Event with id=${id}.`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Event.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Event with id=${id}. Maybe the Event was not found.`,
        });
      } else {
        res.send({
          message: "Event was deleted!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error deleting Event with id=${id}.`,
      });
    });
};

exports.deleteAll = (req, res) => {
  Event.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Events were deleted.`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error occured while deleting all the Events.",
      });
    });
};
