const validator={}

validator.addDocument= async(req, res,next)=>{
    try {
        const {name,subject, desc}= req.body;
        console.log(req.body);
        console.log(req.files.document)
        if(!name || !desc || !req.files.document || !subject){
            return res.status(400).json({error:"Please fill all the fields"});
        }
        console.log(desc);
        next();   
    }   
     catch (error) {
        console.log(error);
        
        return res.status(500).json({error:error.message});
     }
}

module.exports=validator;