const service={};
const fileUploader = require('../../helper/fileUploader');
const config = require("../../config/development");
const Document = require('./model');
const statusCodes = require('../../response/statusCode');
const messages = require('../../response/message');
const Subject = require('../subject/model');
const ObjectId = require("mongoose").Types.ObjectId;


service.addDocument= async(req, res)=>{
    try {
      const {name,desc,subject} = req.body;
        console.log(req.body)
        req.body.name=name;
        req.body.desc= desc;
        req.body.subject= subject;
        req.body.addedBy= req.user._id;
        const file= req.files.document;
        console.log("file details");
        req.body.file_type = file.originalFilename.split('.')[1];
        if (!req.files || !req.files.document) {
            return res.status(400).json({ error: 'Missing required parameter - document this is error' });
        }
        if (!config.FOLDER) {
            return res.status(400).json({ error: 'Missing folder configuration' });
        }
        //console.log(file);
        const fileUpload= await fileUploader.uploadDocument(file, config.FOLDER);
        req.body.file_url= fileUpload.secure_url;
        // console.log(fileUpload);
        console.log(req.body)
        const document= await Document.create(req.body);
        return res.status(201).json({
            status:statusCodes.CREATED,
            message:messages.resourceCreatedSuccessfully,
            result:document,
          });
    }  
     catch (error) {
        console.log(error);
        return res
      .status(500)
      .json({ status:statusCodes.INTERNAL_SERVER_ERROR,message: messages.internalServerError, error: error.message });
    }
}

service.getDocumentBySubject= async(req, res)=>{
    try {
        const subjectId= req.params.id;
        const documents = await Document.find({subject:subjectId}).populate('addedBy').lean();

        if (!documents.length) {
            return res.status(204).json({ status:statusCodes.NO_CONTENT,message: messages.resourceNotFound });
        }
        return res.status(200).json({
            status:statusCodes.OK,
            message:messages.resourceRetrieveSuccessfully,
            result:documents,
          });
    }
     catch (error) {
        return res
      .status(500)
      .json({ status:statusCodes.INTERNAL_SERVER_ERROR,message: messages.internalServerError, error: error.message });
    }
}

service.getDocumentById= async(req, res)=>{
  try {
    const documentId= req.params.id;
    const document = await Document
  .findById(documentId)
  .populate('addedBy', ['firstName', 'lastName', 'email'])
  .lean();
    if (!document) {
      return res.status(204).json({ status:statusCodes.NO_CONTENT,message: messages.resourceNotFound });
    }
    return res.status(200).json({
        status:statusCodes.OK,
        message:messages.resourceRetrieveSuccessfully,
        result:document,
    });
  } catch (error) {
    console.log(error);
        return res
      .status(500)
      .json({ status:statusCodes.INTERNAL_SERVER_ERROR,message: messages.internalServerError, error: error.message });
  }
}
 

module.exports=service;