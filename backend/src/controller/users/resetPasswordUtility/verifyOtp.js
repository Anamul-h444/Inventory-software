const verifyOtp = async (Request, DataModel) => {
  try {
    let email = Request.params.email;
    let OTPCode = Request.params.otp;
    let status = 0; //Before use otp
    let statusUpdate = 1; //After use otp

    //Verify user given otp with database and count
    let OTPCount = await DataModel.aggregate([
      { $match: { email: email, otp: OTPCode, status: status } },
      { $count: "total" },
    ]);

    //Update otp status
    if (OTPCode.length > 0) {
      let OTPUpdate = await DataModel.updateOne(
        { email: email, otp: OTPCode, status: status },
        { email: email, otp: OTPCode, status: statusUpdate }
      );
      return { status: "success", data: OTPUpdate };
    } else {
      return { status: "fail", data: "Invalid OTP Code" };
    }
  } catch (error) {
    return { status: "fail", message: error.message };
  }
};
module.exports = verifyOtp;
