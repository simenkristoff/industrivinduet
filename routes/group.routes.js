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
    app.post('/api/groups', controller.create)

    // Fetch all Groups
    app.get('/api/groups', controller.findAll);

    // Fetch Group by id
    app.get('/api/groups/:id', controller.findOne);

    // Update Group
    app.put('/api/groups/:id', controller.update);

    // Delete Group
    app.delete('/api/groups/:id', controller.delete);

    // Delete all Groups
    app.delete('/api/groups', controller.delete);
}