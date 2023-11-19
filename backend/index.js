const express = require('express');
const app = express();
const config= require('./src/config/development');
require('./src/dbConnection/mongoDbConnect');
const cloudinary= require("./src/config/cloudinary");
cloudinary.cloudinaryConnect();
require('./src/routers/app')(app);
require('./src/routers/routes')(app);


app.listen(config.PORT, () => console.log('Free Notes app listening on port ' + config.PORT));