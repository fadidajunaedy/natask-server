const path = require("path");
const multer = require("multer");
const authService = require("../services/authService.js");

const register = async (req, res, next) => {
  try {
    const request = req.body;
    const result = await authService.register(request);
    res.status(200).json({
      success: true,
      message: "Register Success",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const request = req.body;
    const result = await authService.login(request);
    res.status(200).json({
      success: true,
      message: "Login Success",
      ...result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json({
      success: true,
      message: "Get User Success",
      data: user,
    });
  } catch (e) {
    next(e);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const request = req.body;
    await authService.forgotPassword(request);
    res.status(200).json({
      success: true,
      message: "Password reset link has been sent to your email.",
    });
  } catch (e) {
    next(e);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const token = req.params.token;
    const request = req.body;
    await authService.resetPassword(token, request);
    res.status(200).json({
      success: true,
      message: "Password Reset Success.",
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    if (req.file) request.photo = req.file.path;
    await authService.update(user, request);
    res.status(200).json({
      success: true,
      message: "Update User Success",
    });
  } catch (e) {
    next(e);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    await authService.changePassword(user, request);
    res.status(200).json({
      success: true,
      message: "Change Password Success",
    });
  } catch (e) {
    next(e);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir = `files/user/photo/`;
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
  register,
  login,
  get,
  forgotPassword,
  resetPassword,
  update,
  changePassword,
  upload,
};
