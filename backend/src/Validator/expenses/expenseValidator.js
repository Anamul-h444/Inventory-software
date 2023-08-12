const { check } = require("express-validator");

exports.expenseValidator = [
  check("amount")
    .isNumeric()
    .withMessage("Amount must be number")
    .notEmpty()
    .withMessage("Amount is required")
    .trim(),
  check("note")
    .isString()
    .withMessage("Note must be string")
    .trim()
    .isLength({ max: 200 })
    .withMessage("Note must be at least 200 characters long"),
];
