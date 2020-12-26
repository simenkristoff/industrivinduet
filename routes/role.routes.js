const controller = require('../controllers/role.controller');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Create a new Role
    app.post('/api/role', controller.create)

    // Fetch all Roles
    app.get('/api/role', controller.findAll);

    // Fetch Role by id
    app.get('/api/role/:id', controller.findOne);

    // Update Role
    app.put('/api/role/:id', controller.update);

    // Delete Role
    app.delete('/api/role/:id', controller.delete);

    // Delete all Roles
    app.delete('/api/role', controller.delete);

}