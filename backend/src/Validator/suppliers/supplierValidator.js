const { check } = require("express-validator");

// Custom validation for email
const isEmailValid = (value) => {
  // Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(value);
};

//Custom validation for phone number
const isPhone = (value) => {
  const phoneRegx = /^(?:\+?88)?01[3-9]\d{8}$/;
  return phoneRegx.test(value);
};

exports.supplierValidator = [
  check("name")
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .notEmpty()
    .withMessage("Name is required!")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 5 characters long"),
  check("address").isString().withMessage("Address must be string"),
  check("phone")
    .trim()
    .custom(isPhone)
    .withMessage("Phone number is invalid format")
    .notEmpty()
    .withMessage("Phone is required"),
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .custom(isEmailValid)
    .withMessage("Invalid email format"),
];
