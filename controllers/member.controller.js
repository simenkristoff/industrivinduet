const db = require('../models');
const Member = db.member;
const Role = db.role;

exports.create = async (req, res) => {
    if(!req.body.name) {
        res.status(400).send({
            message: 'Content cannot be empty!'
        });
        return;
    }

    const member = new Member({
        name: req.body.name,
        email: req.body.email
    });

    member.save((err, member) => {

        Role.findOne({ _id: {$in: req.body.role } 
        }, (err, role) => {
            if (err) {
                res.status(404).send({ message: `Role with id=${req.body.role} could not be found.` });
                return;
            }
            member.role = [role._id];
            member.save(err => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

            res.send({ message: "Member was added successfully!" });
            });
        });

    });
};

exports.findAll = (req, res) => {
    Member.find()
    .populate({
        path: 'role',
        populate: {
            path: 'group',
            model: 'Group'
        }
    })
    .exec((err, data) => {
        if(err) {
            res.status(400).send({message: err});
        }
        res.send(data)
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Member.findById(id)
    .populate({
        path: 'role',
        populate: {
            path: 'group',
            model: 'Group'
        }
    })
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

    Member.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message: `Cannot update Member with id=${id}. Maybe the Member was not found.`
                });
            } else {
                res.send({
                    message: 'Member was updated!'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updating Member with id=${id}.`
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Member.findByIdAndRemove(id)
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message: `Cannot delete Member with id=${id}. Maybe the Member was not found.`
                });
            } else {
                res.send({
                    message: 'Member was deleted!'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error deleting Member with id=${id}.`
            });
        });
};

exports.deleteAll = (req, res) => {
    Member.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Members were deleted.`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'An error occured while deleting all the Members.'
            })
        })
};