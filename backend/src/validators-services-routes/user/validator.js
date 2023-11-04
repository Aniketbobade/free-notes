const validator={};


validator.createUser= async(req,res, next)=>{
    try {
        const {firstName,lastName,email} = req.body;
        if(!firstName || !lastName) return res.status(400).json({message:"name is required"});
        if(!email) return res.status(400).json({message:"email is required"});
        next();
    }
     catch (error) {
        return res.status(500).json({message:"Internal Server Error", error:error});
     }
}

validator.setPassword= async(req,res, next)=>{
    try {
        const {password,confirmPassword,userId,token} = req.body;
       if(!password || !confirmPassword) return res.status(400).json({message:"password is required"});
       if(!userId || !token) return res.status(400).json({message:"userId and token is required"});
       if(password!==confirmPassword) return res.status(400).json({message:"password and confirm password should be same"});    
        next();
    }
     catch (error) {
        return res.status(500).json({message:"Internal Server Error", error:error});
     }
}

validator.login= async(req,res, next)=>{
    try {
        if(!req.body.email) return res.status(400).json({message:"email is required"});
        if(!req.body.password) return res.status(400).json({message:"password is required"});
        next();
    }
     catch (error) {
        return res.status(500).json({message:"Internal Server Error", error:error});
    }
}

module.exports=validator;
