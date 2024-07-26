const router = require("express").Router();
const isAuth = require("../../middlewares/isAuth");
const services = require("./service");
const userService = require("./service");
const userValidator = require("./validator");

router.post("/signup", userValidator.createUser, userService.createUser);
router.post("/login", userValidator.login, userService.login);
router.post("/set-password",userValidator.setPassword, userService.setPassword );
router.get("/user-list",userService.getUsers)

/*************User routes */
router.get("/profile",isAuth,services.userProfile);
router.get("/user/messages/:userId", isAuth, services.getMessages)
module.exports = router;