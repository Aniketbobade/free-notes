const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = require('mongoose').Types.ObjectId

const likesSchema = new Schema(
  {
    likeBy: { type: ObjectId, ref: 'User', required: true },
    documentId: { type: ObjectId, ref: 'Document', required: true },
  },
  { timestamps: true }
)

const Like = mongoose.model('Like', likesSchema)

module.exports = Like
