const mongoose = require("mongoose");
const crypto   = require("crypto");

const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const UserSchema = new Schema({
  firstName:  String,
  lastName:   String,
  email: {
    type:     String,
    match:    /.+@.+\..+/
  },
  username: {
    type:     String,
    unique:   true,
    required: "Username is required",
    trim:     true
  },
  password: {
    type:     String,
    validate: [
      (password) => {
        return password.length >= 6;
      }, "Password should be longer"
    ]
  },
  salt : String,
  provider: {
    type: String,
    required: "Provider is required"
  },
  providerId: String,
  providerData: {},
  created: {
    type:     Date,
    default:  Date.now
  }
});

UserSchema.virtual("fullName").get(function() {
  return this.firstName + " " + this.lastName;
}).set(function(fullName) {
  const splitName = fullName.split(" ");
  this.firstName = splitName[0] || "";
  this.lastName = splitName[1] || "";
});

UserSchema.pre("save", function(next) {
  if (this.password) {
    this.salt = new Buffer(crypto.randomBytes(16).toString("base64"),
      "base64");
    this.password = this.hashPassword(this.password);
  }
  next();
});

UserSchema.methods.hashPassword = function(password) {
  return crypto.pbkdf2Sync(password, this.salt, 10000, 64, "sha512")
    .toString("base64");
};

UserSchema.methods.authenticate = function(password) {
  return this.password === this.hashPassword(password);
};

UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
  const possibleUsername = username + (suffix || "");
  this.findOne({ username: possibleUsername }, (err, user) => {
    if (!err) {
      if (!user) {
        callback(possibleUsername);
      } else {
        return this.findUniqueUsername(username, (suffix || 0) + 1, callback);
      }
    } else {
      callback(null);
    }
  });
};

UserSchema.set("toJSON", { getters: true, virtuals: true });

mongoose.model("User", UserSchema);
