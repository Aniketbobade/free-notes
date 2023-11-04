const mongoose = require("mongoose");
const config = require("../config/development");

mongoose.set("strictQuery", false);

mongoose
  .connect(config.MONGO_DB_URL,
    {
      // useCreateIndex: true,
      useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch((err) => {
    console.log("Mongodb connection failed", err);
  });

module.exports = mongoose;