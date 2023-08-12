const { check } = require("express-validator");

exports.productValidator = [
  check("categoryId").trim().notEmpty().withMessage("Category id is required"),
  check("brandId").trim().notEmpty().withMessage("Brand id is required"),
  check("name")
    .isString()
    .withMessage("Name must be string")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Name must be at least 3 characters long"),
  check("unit").trim().notEmpty().withMessage("Unit is required"),

  check("details").isString().withMessage("Details must be string"),
];
