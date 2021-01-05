const controller = require("../controllers/member.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new Member
  app.post("/api/members", controller.create);

  // Fetch all Members
  app.get("/api/members", controller.findAll);

  // Fetch Member by id
  app.get("/api/members/:id", controller.findOne);

  // Update Member
  app.put("/api/members/:id", controller.update);

  // Delete Member
  app.delete("/api/members/:id", controller.delete);

  // Delete all Members
  app.delete("/api/members", controller.delete);
};
