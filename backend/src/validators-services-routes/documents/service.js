const service = {};
const fileUploader = require('../../helper/fileUploader');
const config = require("../../config/development");
const Document = require('./model');
const statusCodes = require('../../response/statusCode');
const messages = require('../../response/message');
const Subject = require('../subject/model');
const ObjectId = require("mongoose").Types.ObjectId;
const path = require('path');
const uploadQueue = require("../../helper/queue");

service.addDocument = async (req, res) => {
  try {
    const file = req.file;
    console.log("file", file);
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }
    const { name, desc, subject } = req.body;
    console.log(req.body)
    req.body.name = name;
    req.body.desc = desc;
    req.body.subject = subject;
    req.body.addedBy = req.user._id;
    // Construct the file path
    const filePath = path.join(__dirname, '../../../uploads', file.filename);
    //  const file= req.files.document;
    if(!filePath){
      return res.status(400).json({ error: 'Missing required parameter - document this is error' });
    }
    req.body.file_type = file.originalname.split('.').pop();
    // if (!req.files || !req.files.document) {
    //   return res.status(400).json({ error: 'Missing required parameter - document this is error' });
    // }
    if (!config.FOLDER) {
      return res.status(400).json({ error: 'Missing folder configuration' });
    }
    //console.log(file);
    //const fileUpload = await fileUploader.uploadDocument(file, config.FOLDER);
    //req.body.file_url = fileUpload.secure_url;
    // console.log(fileUpload);
    //console.log(req.body)
    const document = await Document.create(req.body);
    uploadQueue.add({ filePath: filePath, documentId: document._id });
    return res.status(201).json({
      status: statusCodes.CREATED,
      message: messages.resourceCreatedSuccessfully,
      result: document,
    });
  }
  catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: statusCodes.INTERNAL_SERVER_ERROR, message: messages.internalServerError, error: error.message });
  }
}
service.getDocuments = async (req, res) => {
  try {
    const userId = req.user._id
    if (!userId) {
      return res.status(400).json({ error: messages.userNotFound });
    }
    const documents = await Document.aggregate([
      {
        '$match': {
          'addedBy': new ObjectId(userId)
        }
      }, {
        '$group': {
          '_id': '$subject',
          'documents': {
            '$push': '$$ROOT'
          }
        }
      }, {
        '$lookup': {
          'from': 'subjects',
          'localField': '_id',
          'foreignField': '_id',
          'as': 'subject'
        }
      }, {
        '$unwind': {
          'path': '$subject'
        }
      }, {
        '$project': {
          '_id': 0,
          'documents': 1,
          'subject': 1
        }
      }
    ]);
    if (documents.length) {
      return res.status(200).json({
        status: statusCodes.OK,
        message: messages.resourceRetrieveSuccessfully,
        result: documents,
      });
    } else {
      return res.status(204).json({
        status: statusCodes.NO_CONTENT,
        message: messages.resourceNotFound
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: statusCodes.INTERNAL_SERVER_ERROR, message: messages.internalServerError, error: error.message });
  }
}

service.getDocumentBySubject = async (req, res) => {
  try {
    const subjectId = req.params.id;
    const documents = await Document.find({ subject: subjectId }).populate('addedBy').lean();

    if (!documents.length) {
      return res.status(204).json({ status: statusCodes.NO_CONTENT, message: messages.resourceNotFound });
    }
    return res.status(200).json({
      status: statusCodes.OK,
      message: messages.resourceRetrieveSuccessfully,
      result: documents,
    });
  }
  catch (error) {
    return res
      .status(500)
      .json({ status: statusCodes.INTERNAL_SERVER_ERROR, message: messages.internalServerError, error: error.message });
  }
}

service.getDocumentById = async (req, res) => {
  try {
    const documentId = req.params.id;
    const document = await Document
      .findById(documentId)
      .populate('addedBy', ['firstName', 'lastName', 'email'])
      .lean();
    if (!document) {
      return res.status(204).json({ status: statusCodes.NO_CONTENT, message: messages.resourceNotFound });
    }
    return res.status(200).json({
      status: statusCodes.OK,
      message: messages.resourceRetrieveSuccessfully,
      result: document,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: statusCodes.INTERNAL_SERVER_ERROR, message: messages.internalServerError, error: error.message });
  }
}

service.deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const isPresent = await Document.findOne({ _id: new ObjectId(id), addedBy: new ObjectId(userId) }).lean();
    if (!isPresent) {
      return res.status(204).json({
        status: statusCodes.NO_CONTENT,
        message: messages.resourceNotFound
      });
    }
    //delete from cloudinary
    const deleteFileCludinary = await fileUploader.deleteDocument(isPresent.public_Id,isPresent.resource_type)
    
    console.log(deleteFileCludinary)
    if(!deleteFileCludinary){
      return res.status(500).json({
        status: statusCodes.INTERNAL_SERVER_ERROR,
        message: messages.internalServerError
      })
    }
    const deleteDocument = await Document.findByIdAndDelete(id).lean();
    return res.status(200).json({
      status: statusCodes.OK,
      message: messages.resourceDeletedSuccessfully,
      result: deleteDocument
    })

  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: statusCodes.INTERNAL_SERVER_ERROR, message: messages.internalServerError, error: error.message });
  }
}


module.exports = service;