const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found in DB",
      });
    }

    req.profile = user;
    next();
  });
};

exports.getUser = (req, res, next) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;

  return res.json(req.profile);
  next();
};

exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    { _id: req.profile.id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "User not updated sucessfully",
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      res.json(user);
      next();
    }
  );
};

exports.userPurchaseList = (req, res, next) => {
  Order.find({ user: req.profile.id })
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No orders in your account",
        });
      }

      return res.json(order);
    });
  next();
};

exports.pushOrderInPurchaseList = (req, res, next) => {
  var purchases = [];
  req.body.order.products.forEach((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    });
  });

  //store this in DB
  User.findOneAndUpdate(
    { _id: req.profile.id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save purchase list",
        });
      }
      next();
    }
  );
};
