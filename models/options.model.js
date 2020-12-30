const mongoose = require('mongoose');

const Options = mongoose.model(
    'Options',
    new mongoose.Schema({
        siteName: {type: String, default: 'Industrivinduet'},
        eventTypes: {type: Array, default: ['Case', 'Foredrag']}
    })
);

module.exports = Options;
