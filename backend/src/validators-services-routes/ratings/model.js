const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require("mongoose").Types.ObjectId;

const ratingSchema= new Schema({
    userId:{type:ObjectId, ref:'User', required:true},
    document:{type:ObjectId, ref:'Document', required:true},
    rating:{type:Number, required:true, min:1, max:5}
},{timestamps:true});

const Rating = mongoose.model('Rating',ratingSchema);

module.exports=Rating;