
module.exports = (app) => {
    app.use("/api", [
     require("../validators-services-routes/user/routes"),
     require("../validators-services-routes/field/routers"),
     require("../validators-services-routes/subject/routes"),
     require("../validators-services-routes/documents/routes"),
     require("../validators-services-routes/likes/routes"),
     require("../validators-services-routes/reviews/routes"),
    ]);
    app.get("/", (req, res) => {
      res.send("Hello from server");
    });
    app.all("*", (req, res) => {
      return res.status(404).jsonp({
        status: 404,
        message: "route Not Found",
      });
    });
  };