const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require("mongoose").Types.ObjectId;

const documentSchema= new Schema({
    name:{type:String,required:true},
    desc:{type:String,required:true},
    file_url:{type:String,required:true},
    file_type:{type:String,required:true},
    addedBy:{type:ObjectId, ref:'User', required:true},
    subject:{type:ObjectId, ref:'Subject', required:true},
},{timestamps:true});

const Document = mongoose.model('Document',documentSchema);

module.exports=Document;