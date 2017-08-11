const express = require("express");

module.exports = () => {
  const app = express();
  require("../app/routes/index.server.routes") (app);
  return app;
};
