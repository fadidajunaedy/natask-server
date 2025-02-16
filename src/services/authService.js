const fs = require("fs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const ResponseError = require("../error/responseError.js");
const generateEmail = require("../utils/generateEmail.js");
const generateToken = require("../utils/generateToken.js");
const ResetPasswordToken = require("../models/resetPasswordTokenModel.js");

const { hashPassword, comparePassword } = require("../utils/passwordUtils.js");

const register = async (request) => {
  const isEmailExist = await User.findOne({ email: request.email });
  if (isEmailExist) throw new ResponseError(400, "Email already exist");

  request.password = await hashPassword(request.password);
  const newUser = await User.create(request);

  return newUser;
};

const login = async (request) => {
  const user = await User.findOne({ email: request.email });
  if (!user) throw new ResponseError(400, "Email or Password are wrong");

  const isMatch = await comparePassword(request.password, user.password);
  if (!isMatch) throw new ResponseError(400, "Email or Password are wrong");

  const accessToken = await generateToken.generateAccessToken(user);

  return {
    data: user.toObject(),
    token: accessToken,
  };
};

const forgotPassword = async (request) => {
  const user = await User.findOne({ email: request.email });
  if (!user) throw new ResponseError(400, "Email is not found");

  const resetPasswordToken = await generateToken.resetPasswordToken(user);
  await ResetPasswordToken.create({
    userId: user._id,
    token: resetPasswordToken,
  });
  await generateEmail.emailResetPassword(user, resetPasswordToken);

  return;
};

const resetPassword = async (token, request) => {
  const checkToken = await ResetPasswordToken.findOne({ token });
  if (!checkToken) throw new ResponseError(400, "Token not found");

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!decodedToken._id) throw new ResponseError(400, "User ID not found");

    const user = await User.findOneAndUpdate(
      { _id: decodedToken._id },
      { password: await hashPassword(request.newPassword) },
      { new: true }
    );

    if (!user) throw new ResponseError(400, "User not found");

    await ResetPasswordToken.deleteOne({ token });
  } catch (error) {
    await ResetPasswordToken.deleteOne({ token });

    if (error.name === "TokenExpiredError") {
      throw new ResponseError(400, "Token has expired");
    } else if (error.name === "JsonWebTokenError") {
      throw new ResponseError(400, "Token is invalid");
    } else {
      throw new ResponseError(500, "Error verifying token");
    }
  }
};

const update = async (user, request) => {
  if (request.photo && user.photo && request.photo !== user.photo) {
    fs.unlink(`files/user/photo/${user.photo}`, (err) => {
      if (err) console.error("Error deleting previous file:", err);
      console.log("Previous file deleted, insert new file");
    });
  }

  await User.updateOne({ _id: user._id }, request);

  return;
};

const changePassword = async (user, request) => {
  const isMatch = await comparePassword(request.currentPassword, user.password);
  if (!isMatch) throw new ResponseError(400, "Current Password are wrong");

  const newPassword = await hashPassword(request.newPassword);
  await User.updateOne({ _id: user._id }, { password: newPassword });

  return;
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  update,
  changePassword,
};
