const Field = require("./model")

const service={}


service.createField= async(req, res)=>{
    try {
        const result= await Field.create(req.body)
        res.status(200).json(result)

    } catch (error) {
        return res.status(500).json(error);
    }
}

service.getField= async(req, res)=>{
    try {
        let matchObject={}
        if(req.query.id){
            matchObject._id= req.query.id
        }  
        const result= await Field.find(matchObject);
        res.status(200).json(result)

    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports=service;