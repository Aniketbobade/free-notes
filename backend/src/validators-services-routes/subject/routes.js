const router = require("express").Router();
const isAuth = require("../../middlewares/isAuth");
const service = require("./service");
const validator= require('./validator');

router.post("/user/add-subject",isAuth, validator.addSubject, service.addSubject);
router.get("/get-subjects", service.getSubjects);
module.exports= router;
