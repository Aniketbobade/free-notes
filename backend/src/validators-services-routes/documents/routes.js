const router = require("express").Router();
const isAuth = require("../../middlewares/isAuth");
const service = require("./service");
const validator= require('./validator');
const multer = require('multer');
// Use multer to handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original name of the file
  }
});
const upload = multer({ storage: storage });
router.post("/user/add-document",isAuth,upload.single('document'),validator.addDocument, service.addDocument);
router.get('/user/get-documents',isAuth,service.getDocuments);
router.get("/subject-document/:id",service.getDocumentBySubject);
router.get("/document/:id",service.getDocumentById);
router.delete("/user/delete-document/:id",isAuth,service.deleteDocument);
module.exports= router;