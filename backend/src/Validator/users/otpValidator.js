const { check } = require("express-validator");

// Custom validation for password
const isPasswordValid = (value) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(value);
};

exports.otpValidator = [
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .custom(isPasswordValid)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
];
