const { check } = require("express-validator");

exports.expenseTypeValidator = [
  check("name")
    .isString()
    .withMessage("Name must be string")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Brand must be at least 3 characters long"),
];
