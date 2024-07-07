const router = require("express").Router();
const isAuth = require("../../middlewares/isAuth");
const service = require("./service");
const validator= require('./validator');
const Multer = require("multer");
const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});
router.post("/user/add-document",isAuth, validator.addDocument, service.addDocument);
router.get('/user/get-documents',isAuth,service.getDocuments);
router.get("/subject-document/:id",service.getDocumentBySubject);
router.get("/document/:id",service.getDocumentById);
module.exports= router;