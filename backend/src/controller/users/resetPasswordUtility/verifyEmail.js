const { Otp } = require("../../../models/users/Otp");
const SendEmail = require("./sendEmail");

const verifyEmail = async (Request, DataModel) => {
  console.log(DataModel);
  try {
    let email = Request.params.email;
    let OTPCode = Math.floor(100000 + Math.random() * 900000);

    // Verify given email with database using aggregation
    let userCount = await DataModel.aggregate([
      { $match: { email: email } },
      { $count: "total" },
    ]);
    console.log(userCount);
    if (userCount.length > 0) {
      // Create OTP in the database
      await Otp.create({ email: email, otp: OTPCode });

      // Send OTP by email to the user
      let sendEmail = await SendEmail(
        email,
        "Your PIN Code is: " + OTPCode,
        "Inventory PIN Verification"
      );
      return { status: "success", data: sendEmail };
    } else {
      return { status: "fail", data: "No User Found" };
    }
  } catch (error) {
    return { status: "fail", message: error.message };
  }
};

module.exports = verifyEmail;
