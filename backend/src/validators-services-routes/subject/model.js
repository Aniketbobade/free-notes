const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require("mongoose").Types.ObjectId;

const subject= new Schema({
    name:{type:String,required:true},
    desc:{type:String,required:true},
    tags:[{type:String}],
    field:{type:ObjectId,ref:"field",required:true},
    created_at:{type:Date,default:Date.now},
    updated_at:{type:Date,default:Date.now}
});

const subjectModel = mongoose.model('subject',subject);

module.exports = subjectModel;