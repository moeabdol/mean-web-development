const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const UserSchema = new Schema({
  firstName:  String,
  lastName:   String,
  email:      String,
  username:   String,
  password:   String,
  created: {
    type:     Date,
    default:  Date.now
  }
});

mongoose.model("User", UserSchema);
