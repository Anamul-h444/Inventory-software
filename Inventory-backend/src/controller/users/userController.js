const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../../models/users/User");

module.exports.registration = async (req, res) => {
  try {
    const { firstName, lastName, email, password, mobile, photo } = req.body;
    let user = {};
    user = await User.findOne({ email: email });
    if (user) return res.status(400).send("User already registered");
    user = new User({ firstName, lastName, email, password, mobile, photo });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const newUser = await user.save();
    return res.status(201).json({
      success: true,
      message: "Registration Successful",
      user: _.pick(newUser, [
        "_id",
        "firstName",
        "lastName",
        "email",
        "mobile",
      ]),
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email!");

    const validUser = await bcrypt.compare(req.body.password, user.password);
    if (!validUser) return res.status(400).send("Invalid password!");

    const token = await user.jenerateJWT();

    return res.status(200).json({
      success: true,
      message: "Login Successful!",
      token: "Bearer " + token,
      user: _.pick(user, [
        "_id",
        "firstName",
        "lastName",
        "email",
        "mobile",
        "role",
      ]),
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//Update user
module.exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const email = req.headers.email;

  try {
    let user = await User.findOne({ _id: id, email: email });
    if (!user) return res.status(404).send("User not found!");

    // Salting password which user change
    const salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create request body
    let reqBody = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      mobile: req.body.mobile,
    };

    // Update User
    let updateUser = await User.updateOne({ _id: id }, reqBody);

    return res.status(200).json({
      message: "User update successful!",
      success: true,
      updateUser,
    });
  } catch (error) {
    if (error.name === "CastError") {
      // Handle "Cast to ObjectId failed" error
      return res.status(404).send("User not found!");
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

//Delete User
module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    let user = {};
    user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const deletedUser = await User.deleteOne(user);
    res
      .status(200)
      .json({ success: true, message: "User Delete succesful", deletedUser });
  } catch (error) {
    if (error.name === "CastError") {
      // Handle "Cast to ObjectId failed" error
      return res.status(404).send("User not found!");
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

//Get All Users
module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      success: true,
      message: "Users retrieved successful",
      users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  const id = req.params.id;
  const email = req.headers.email;
  try {
    const user = await User.find({ _id: id, email: email });
    if (user.length === 0) {
      // user not found
      throw new Error("User not found");
    }
    res.status(200).json({
      success: true,
      message: "user retrieved successful",
      user,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).send("User is not found");
    }
    res.status(400).json({ success: false, message: error.message });
  }
};
