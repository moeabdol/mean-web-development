const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const UserSchema = new Schema({
  firstName:  String,
  lastName:   String,
  email: {
    type:     String,
    index:    true,
    match:    /.+@.+\..+/
  },
  username: {
    type:     String,
    trim:     true,
    unique:   true,
    required: true
  },
  password: {
    type:     String,
    validate: [
      (password) => {
        return password.length >= 6;
      },
      "Password should be longer"
    ]
  },
  created: {
    type:     Date,
    default:  Date.now
  },
  website: {
    type:     String,
    get: (url) => {
      if (!url) {
        return url;
      } else {
        if (url.indexOf("http://") !== 0 && url.indexOf("https://") !== 0) {
          url = "http://" + url;
        }
        return url;
      }
    }
  },
  role: {
    type:     String,
    default:  "User",
    enum: ["Admin", "Owner", "User"],
    required: true
  }
});

UserSchema.virtual("fullName").get(function() {
  return this.firstName + " " + this.lastName;
}).set(function(fullName) {
  const splitName = fullName.split(" ");
  this.firstName = splitName[0] || "";
  this.lastName = splitName[1] || "";
});

UserSchema.set("toJSON", { getters: true, virtuals: true });

mongoose.model("User", UserSchema);
