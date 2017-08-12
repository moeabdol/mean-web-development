const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const UserSchema = new Schema({
  firstName:  String,
  lastName:   String,
  email:      String,
  username: {
    type:     String,
    trim:     true
  },
  password:   String,
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
  }
});

UserSchema.virtual("fullName").get(() => {
  return this.firstName + " " + this.lastName;
}).set((fullName) => {
  const splitName = fullName.split(" ");
  this.firstName = splitName[0] || "";
  this.lastName = splitName[1] || "";
});

UserSchema.set("toJSON", { getters: true, virtuals: true });

mongoose.model("User", UserSchema);
