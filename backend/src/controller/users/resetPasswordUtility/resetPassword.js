const { Otp } = require("../../../models/users/Otp");
const bcrypt = require("bcrypt");

const resetPassword = async (Request, DataModel) => {
  let email = Request.body["email"];
  let OTPCode = Request.body["OTP"];
  let NewPass = Request.body["password"];
  let statusUpdate = 1;

  try {
    // Database First Process
    let OTPUsedCount = await Otp.aggregate([
      { $match: { email: email, otp: OTPCode, status: statusUpdate } },
      { $count: "total" },
    ]);

    if (OTPUsedCount.length > 0) {
      //Create hashed password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(NewPass, salt);
      // Database Second Process
      let PassUpdate = await DataModel.updateOne(
        { email: email },
        { password: hashedPassword }
      );
      return { status: "success", data: PassUpdate };
    } else {
      return { status: "fail", data: "Invalid Request" };
    }
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};
module.exports = resetPassword;
