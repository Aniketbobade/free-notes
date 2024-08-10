const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require("mongoose").Types.ObjectId;

const documentSchema= new Schema({
    name:{type:String,required:true},
    desc:{type:String,required:true},
    file_url:{type:String},
    public_Id:{type:String},
    file_type:{type:String,required:true},
    resource_type:{type:String},
    addedBy:{type:ObjectId, ref:'User', required:true},
    subject:{type:ObjectId, ref:'Subject', required:true},
    uploadStatus:{type:String,enum:['PENDING','UPLOADED','REJECTED'],default:'PENDING'},
},{timestamps:true});

const Document = mongoose.model('Document',documentSchema);

module.exports=Document;