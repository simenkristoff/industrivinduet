const db = require('../models');
const Role = db.role;
const Group = db.group;

exports.create = async (req, res) => {
    if(!req.body.name) {
        res.status(400).send({
            message: 'Content cannot be empty!'
        });
        return;
    }

    const role = new Role({
        name: req.body.name
    });

    role.save((err, role) => {

        Group.findOne({ _id: {$in: req.body.group } 
        }, (err, group) => {
            if (err) {
                res.status(404).send({ message: `Group with id=${req.body.group} could not be found.` });
                return;
            }
            role.group = [group._id];
            role.save(err => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

            res.send({ message: "Role was added successfully!" });
            });
        });

    });
};

exports.findAll = (req, res) => {
    Role.find()
    .populate('group')
    .exec((err, data) => {
        if(err) {
            res.status(400).send({message: err});
        }
        res.send(data)
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Role.findById(id)
    .populate('group')
    .exec((err, data) => {
        if(err) {
            res.status(400).send({message: err});
        }
        res.send(data)
    })
};

exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: 'Data to update can not be empty.'
        });
    }

    const id = req.params.id;

    Role.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message: `Cannot update Role with id=${id}. Maybe the Role was not found.`
                });
            } else {
                res.send({
                    message: 'Role was updated!'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updating Role with id=${id}.`
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Role.findByIdAndRemove(id)
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message: `Cannot delete Role with id=${id}. Maybe the Role was not found.`
                });
            } else {
                res.send({
                    message: 'Role was deleted!'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error deleting Role with id=${id}.`
            });
        });
};

exports.deleteAll = (req, res) => {
    Role.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Roles were deleted.`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'An error occured while deleting all the Roles.'
            })
        })
};