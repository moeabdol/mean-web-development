const User = require("mongoose").model("User");

exports.create = (req, res, next) => {
  const user = new User(req.body);

  user.save((err) => {
    if (err) {
      return next(err);
    } else {
      res.status(200).json(user);
    }
  });
};

exports.list = (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) {
      return next(err);
    } else {
      res.status(200).json(users);
    }
  });
};

exports.read = (req, res) => {
  res.json(req.user);
};

exports.userById = (req, res, next, id) => {
  User.findOne({ _id: id }, (err, user) => {
    if (err) {
      return next(err);
    } else {
      req.user = user;
      next();
    }
  });
};

exports.update = (req, res, next) => {
  User.findByIdAndUpdate(req.user.id, req.body, { new: true }, (err, user) => {
    if (err) {
      return next(err);
    } else {
      res.status(200).json(user);
    }
  });
};
