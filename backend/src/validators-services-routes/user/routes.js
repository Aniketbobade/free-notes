const router = require("express").Router();
const isAuth = require("../../middlewares/isAuth");
const services = require("./service");
const userService = require("./service");
const userValidator = require("./validator");

router.post("/signup", userValidator.createUser, userService.createUser);
router.post("/login", userValidator.login, userService.login);
router.post("/set-password",userValidator.setPassword, userService.setPassword );

/*************User routes */
router.get("/user",isAuth,services.userProfile);
module.exports = router;