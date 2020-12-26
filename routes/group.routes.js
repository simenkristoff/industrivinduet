const controller = require('../controllers/group.controller');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Create a new Group
    app.post('/api/group', controller.create)

    // Fetch all Groups
    app.get('/api/group', controller.findAll);

    // Fetch Group by id
    app.get('/api/group/:id', controller.findOne);

    // Update Group
    app.put('/api/group/:id', controller.update);

    // Delete Group
    app.delete('/api/group/:id', controller.delete);

    // Delete all Groups
    app.delete('/api/group', controller.delete);
}