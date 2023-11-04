const router = require("express").Router();
const isAuth = require("../../middlewares/isAuth");
const service = require("./service");
const validator= require('./validator');

router.post('/user/create-field',isAuth,validator.createField,service.createField);
router.get('/get-fields',service.getField);

module.exports= router;
