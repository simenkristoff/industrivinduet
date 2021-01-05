const controller = require("../controllers/event.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new Member
  app.post("/api/events", controller.create);

  // Fetch all Members
  app.get("/api/events", controller.findAll);

  // Fetch Member by id
  app.get("/api/events/:id", controller.findOne);

  // Update Member
  app.put("/api/events/:id", controller.update);

  // Delete Member
  app.delete("/api/events/:id", controller.delete);

  // Delete all Members
  app.delete("/api/events", controller.delete);
};
