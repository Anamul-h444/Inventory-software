const jwt = require("jsonwebtoken");

module.exports.userAuth = async (req, res, next) => {
  let token = req.header("token");
  if (!token) return res.status(401).send("Access denied! No token provided!");
  // Bearer 1234abcd
  else token = token.split(" ")[1].trim();
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).send("Invalid token");
  }
};

module.exports.adminAuth = function (req, res, next) {
  //console.log(req.user)
  if (req.user.role !== "admin") {
    return res.status(403).send("Forbidden!");
  } else {
    return next();
  }
};
