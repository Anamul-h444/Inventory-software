const { check } = require("express-validator");

exports.categoryValidator = [
  check("name")
    .isString()
    .withMessage("Category must be string")
    .trim()
    .notEmpty()
    .withMessage("Category is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Category must be at least 3 characters long"),
];
