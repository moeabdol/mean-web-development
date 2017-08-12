const users = require("../controllers/users.server.controller");

module.exports = (app) => {
  app.route("/users").post(users.create);
};
