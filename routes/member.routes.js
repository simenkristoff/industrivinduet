const controller = require('../controllers/member.controller');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Create a new Member
    app.post('/api/member', controller.create)

    // Fetch all Members
    app.get('/api/member', controller.findAll);

    // Fetch Member by id
    app.get('/api/member/:id', controller.findOne);

    // Update Member
    app.put('/api/member/:id', controller.update);

    // Delete Member
    app.delete('/api/member/:id', controller.delete);

    // Delete all Members
    app.delete('/api/member', controller.delete);

}