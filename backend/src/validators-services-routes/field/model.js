const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require("mongoose").Types.ObjectId;

const fieldSchema= new Schema({
    name:{type:String,required:true, unique:true},
    desc:{type:String,required:true},
});

const Field = mongoose.model('Field',fieldSchema);

module.exports=Field;