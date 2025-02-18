const fs = require("fs");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const User = require("../models/userModel.js");
const Employee = require("../models/employeeModel.js");
const ResponseError = require("../error/responseError.js");

const create = async (user, request) => {
  const checkUser = await User.findById(user._id);
  if (!checkUser) throw new ResponseError(400, "User not exist");

  const isEmailExist = await Employee.findOne({ email: request.email });
  if (isEmailExist) throw new ResponseError(400, "Email already exist");

  const newEmployee = await Employee.create({
    userId: user._id,
    ...request,
  });

  return newEmployee;
};

const update = async (user, _id, request) => {
  const employee = await Employee.findById(_id);
  if (!employee) throw new ResponseError(404, "Employee not found");

  if (!employee.userId.equals(new mongoose.Types.ObjectId(user._id))) {
    throw new ResponseError(400, "You're not authorized");
  }

  if (request.email && employee.email && request.email !== employee.email) {
    const isEmailExist = await Employee.findOne({ email: request.email });
    if (isEmailExist) throw new ResponseError(400, "Email already exist");
  }

  if (request.photo && employee.photo && request.photo !== employee.photo) {
    const publicId = employee.photo.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`photo/${publicId}`);
  }

  await employee.updateOne(request);
  return;
};

const getAll = async (user) => {
  const query = user._id ? { userId: user._id } : {};
  const employees = await Employee.find(query);

  return employees;
};

const get = async (_id) => {
  const employee = await Employee.findById(_id);
  if (!employee) throw new ResponseError(400, "Employee not found");

  return employee;
};

const remove = async (_id) => {
  const employee = await Employee.findById(_id);
  if (!employee) throw new ResponseError(400, "Employee not found");

  fs.unlink(`files/employee/photo/${employee.photo}`, (err) => {
    if (err) console.error("Error deleting previous file:", err);
    console.log("Previous file deleted, insert new file");
  });

  await employee.deleteOne();
  return;
};

module.exports = {
  create,
  update,
  getAll,
  get,
  remove,
};
