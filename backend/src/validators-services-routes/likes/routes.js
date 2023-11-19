const router = require("express").Router();
const isAuth = require("../../middlewares/isAuth");
const service = require("./service");
const validator= require('./validator');

router.put("/user/likes/:documentId",isAuth, service.addRemoveLike);
router.get("/user/documentLike/:documentId", service.getLikesByDocument);
module.exports= router;