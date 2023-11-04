const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const token = Schema({
    userId:{type:String, required:true},
    token:{type:String, required:true},
});

const Token = mongoose.model('Token', token);

module.exports = Token;
