const validator={}

validator.addDocument= async(req, res,next)=>{
    try {
        const {name,subject, desc}= req.body;
        if(!name || !desc || !req.files.document || !subject){
            return res.status(400).json({error:"Please fill all the fields"});
        }
        next();   
    }   
     catch (error) {
        console.log(error);
        
        return res.status(500).json({error:error.message});
     }
}

module.exports=validator;