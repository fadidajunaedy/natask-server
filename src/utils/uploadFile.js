const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const allowedFormats = ["jpg", "jpeg", "png", "webp"];
    const fileExtension = file.mimetype.split("/")[1];

    if (!allowedFormats.includes(fileExtension)) {
      throw new Error("Format file tidak didukung");
    }

    return {
      folder: "photo",
      format: fileExtension,
      public_id: Date.now().toString(),
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
