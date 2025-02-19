const web = require("./application/web.js");

web.listen(process.env.PORT, () =>
  console.log(`Server running at port ${process.env.PORT}`)
);
