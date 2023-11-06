const Field = require("./model")
const messages= require("../../response/message")
const statusCodes= require("../../response/statusCode")
const service={}


service.createField= async(req, res)=>{
    try {
        const isAlreadyExist= await Field.findOne({name:req.body.name})
        if(isAlreadyExist){
            return res.status(400).json({status:statusCodes.BAD_REQUEST, message:messages.isAlreadyExist})
        }
        const result= await Field.create(req.body)
        res.status(201).json({status:statusCodes.CREATED, message:messages.resourceCreatedSuccessfully, result:result})

    } catch (error) {
        return res.status(500).json({status:statusCodes.INTERNAL_SERVER_ERROR, message:messages.internalServerError, error:error.message});
    }
}

service.getFields= async(req, res)=>{
    try {
        let matchObject = {};

        if (req.query.id) {
            matchObject._id = req.query.id;
        }

        if (req.query.name) {
            // Use a regular expression to perform a case-insensitive search on the 'name' field
            matchObject.name = new RegExp(req.query.name, 'i');
        }

        if (req.query.desc) {
            // Use a regular expression to perform a case-insensitive search on the 'desc' field
            matchObject.desc = new RegExp(req.query.desc, 'i');
        }

        const result = await Field.find(matchObject);
        res.status(200).json(result)

    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports=service;