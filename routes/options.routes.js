const controller = require('../controllers/options.controller');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Fetch Options
    app.get('/api/options', controller.get);

    // Update Options
    app.put('/api/options', controller.update);

    // Reset an Option
    app.put('/api/options/reset', controller.resetFields);

    // Reset all Options
    app.put('/api/options/reset-all', controller.resetToDefault);

}