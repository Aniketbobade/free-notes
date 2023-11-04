const service={};
const fileUploader = require('../../helper/fileUploader');
const config = require("../../config/development");
const Document = require('./model');
service.addDocument= async(req, res)=>{
    try {
        req.body.addedBy= req.user._id;
        const file= req.files.document;
        console.log("file details",file);
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
        const document= await Document.create(req.body);
        return res.status(200).json({message:"Document added successfully",document});
    }  
     catch (error) {
        console.log(error);
        return res.status(500).json({error:error.message});
    }
}

service.getDocumentBySubject= async(req, res)=>{
    try {
        const subjectId= req.params.id;
        const documents = await Document.find({subject:subjectId}).populate('addedBy').lean();
        return res.status(200).json({
            success: true,
            documents,
        })
    }
     catch (error) {
        return res.status(500).json({   
            message: error.message,
        });
    }
}
 

module.exports=service;