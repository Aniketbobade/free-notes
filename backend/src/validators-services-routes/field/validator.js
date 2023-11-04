const validator={};


validator.createField= async(req, res,next)=>{

    if(req.body.name==undefined || req.body.name==null){
        res.status(400).json({message:"Name is required"})
    }
    next();   
}

module.exports=validator;
