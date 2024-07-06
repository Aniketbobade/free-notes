const express = require("express");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const mailService = require("./src/helper/emailService");
const config = require("./src/config/development");
const dbConnect = require("./src/dbConnection/mongoDbConnect");
const cloudinary = require("./src/config/cloudinary");

cloudinary.cloudinaryConnect();
require("./src/routers/app")(app);
require("./src/routers/routes")(app);


dbConnect()
  .then(() => {
    app.listen(config.PORT, () =>
      console.log("Free Notes app listening on port " + config.PORT)
    );
    let currentDate = new Date();
    //  mailService.sendInviteMail(
    //   "bobadeaniket5@gmail.com",
    //   "sever started",
    //   ` server started at ${currentDate.toUTCString()}`
    // );
  })
  .catch((err) => {
    console.log(err);
  });
