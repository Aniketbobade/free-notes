const router = require("express").Router();
const isAuth = require("../../middlewares/isAuth");
const service = require("./service");
const validator= require('./validator');

router.post("/user/add-review",isAuth, service.addReview);
router.get("/get-reviews/:documentId", service.getReviewByDocument);

module.exports= router;