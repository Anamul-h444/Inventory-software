const { check } = require("express-validator");

// Custom validation for password
const isPasswordValid = (value) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(value);
};

// Custom validation for email
const isEmailValid = (value) => {
  // Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(value);
};

//Custom validation for mobile number
const isMobileValid = (value) => {
  const mobileRegx = /^01[3-9]\d{8}$/;
  return mobileRegx.test(value);
};

exports.userValidator = [
  check("firstName")
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .notEmpty()
    .withMessage("Name is required!")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),

  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .custom(isEmailValid)
    .withMessage("Invalid email format"),

  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .custom(isPasswordValid)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),

  check("mobile")
    .trim()
    .notEmpty()
    .withMessage("Mobile number is required!")
    .custom(isMobileValid)
    .withMessage("Invalid Mobile format!"),
];
