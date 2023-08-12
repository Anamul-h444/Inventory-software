const verifyEmail = require("./resetPasswordUtility/verifyEmail");
const verifyOtp = require("./resetPasswordUtility/verifyOtp");
const resetPassword = require("./resetPasswordUtility/resetPassword");

const { User } = require("../../models/users/User");
const { Otp } = require("../../models/users/Otp");

exports.VerifyEmail = async (req, res) => {
  let Result = await verifyEmail(req, User);
  res.status(200).json(Result);
};

exports.VerifyOTP = async (req, res) => {
  let Result = await verifyOtp(req, Otp);
  res.status(200).json(Result);
};

exports.ResetPassword = async (req, res) => {
  let Result = await resetPassword(req, User);
  res.status(200).json(Result);
};
