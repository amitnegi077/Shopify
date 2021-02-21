const Category = require("../models/category");
const { validationResult } = require("express-validator");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found in DB",
      });
    }
    req.category = category;
    next();
  });
};

exports.createCategory = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const category = new Category(req.body);
    category.save((err, category) => {
      if (err) {
        return res.stauts(400).json({
          error: "Category not saved in DB",
        });
      }
      return res.json({ category });
      next();
    });
  } else {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
};

exports.getCategory = (req, res, next) => {
  return res.json(req.category);
  next();
};

exports.getAllCategory = (req, res, next) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "No category found in DB",
      });
    }
    return res.json(categories);
    next();
  });
};

exports.updateCategory = (req, res, next) => {
  const category = req.category;
  category.name = req.body.name;

  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update category",
      });
    }
    return res.json(updatedCategory);
    next();
  });
};

exports.removeCategory = (req, res, next) => {
  const category = req.category;

  category.remove((err, deletedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete category",
      });
    }
    return res.json({
      message: `${deletedCategory.name} Succesfully Deleted`,
    });
    next();
  });
};
