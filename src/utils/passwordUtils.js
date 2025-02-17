const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(
      parseInt(process.env.PASSWORD_SALT) || 12
    );
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.log(error);
  }

  return null;
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
  hashPassword,
  comparePassword,
};
