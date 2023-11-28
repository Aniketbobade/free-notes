const express = require("express");
const app = express();
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
    let cDay = currentDate.getDate();
    let cMonth = currentDate.getMonth() + 1;
    let cYear = currentDate.getFullYear();
    let cHours = currentDate.getHours();
    let cMinutes = currentDate.getMinutes();
    let cSeconds = currentDate.getSeconds();
     mailService.sendInviteMail(
      "bobadeaniket5@gmail.com",
      "sever started",
      ` server started at ${cDay + "/" + cMonth + "/" + cYear + " " + cHours + ":" + cMinutes + ":" + cSeconds}`
    );
  })
  .catch((err) => {
    console.log(err);
  });
