const path = require("path");
const multer = require("multer");
const employeeService = require("../services/employeeService.js");

const create = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;

    if (req.file) request.photo = req.file.path;
    const result = await employeeService.create(user, request);

    res.status(200).json({
      success: true,
      message: "Create Employee Success",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const user = req.user;
    const _id = req.params._id;
    const request = req.body;

    if (req.file) request.photo = req.file.path;
    await employeeService.update(user, _id, request);

    res.status(200).json({
      success: true,
      message: "Update Employee Success",
    });
  } catch (e) {
    next(e);
  }
};

const getAll = async (req, res, next) => {
  try {
    const user = req.user;
    const result = await employeeService.getAll(user);
    res.status(200).json({
      success: true,
      message: "Get All Employee Success",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const _id = req.params._id;
    const result = await employeeService.get(_id);
    res.status(200).json({
      success: true,
      message: "Get Employee Success",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const _id = req.params._id;
    await employeeService.remove(_id);
    res.status(200).json({
      success: true,
      message: "Delete Employee Success",
    });
  } catch (e) {
    next(e);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir = `files/employee/photo/`;
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, `${Date.now()}${extension}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).fields([{ name: "photo", maxCount: 1 }]);

module.exports = {
  create,
  update,
  getAll,
  get,
  remove,
  upload,
};
