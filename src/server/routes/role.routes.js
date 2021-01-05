const controller = require("../controllers/role.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new Role
  app.post("/api/roles", controller.create);

  // Fetch all Roles
  app.get("/api/roles", controller.findAll);

  // Fetch Role by id
  app.get("/api/roles/:id", controller.findOne);

  // Update Role
  app.put("/api/roles/:id", controller.update);

  // Delete Role
  app.delete("/api/roles/:id", controller.delete);

  // Delete all Roles
  app.delete("/api/roles", controller.delete);
};
