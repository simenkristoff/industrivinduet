const mongoose = require('mongoose');

const Event = mongoose.model(
    'Event',
    new mongoose.Schema({
        title: String,
        type: String,
        date: Date,
        starttime: Date,
        endtime: Date,
        place: String,
        dining: String,
        description: String,
        image: String,
        member: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Member'
        }
    },
    {timestamps: true})
);

module.exports = Event;
