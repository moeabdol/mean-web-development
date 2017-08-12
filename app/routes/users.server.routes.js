const users = require("../controllers/users.server.controller");

module.exports = (app) => {
  app.route("/users")
    .post(users.create)
    .get(users.list);

  app.route("/users/:userId")
    .get(users.read);

  app.param("userId", users.userById);
};
