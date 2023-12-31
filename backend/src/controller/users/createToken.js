const jwt = require("jsonwebtoken");

const createToken = async (data) => {
  let Payload = {
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
    data: data,
  };
  return await jwt.sign(Payload, process.env.JWT_SECRET_KEY);
};
module.exports = createToken;
