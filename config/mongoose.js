const config = require("./config");
const mongoose = require("mongoose");

module.exports = () => {
  const db = mongoose.connect(config.db, { useMongoClient: true });

  require("../app/models/user.server.model");

  return db;
};
