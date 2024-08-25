const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = require('mongoose').Types.ObjectId

const roomSchema = new Schema(
  {
    name: { type: String, required: true },
    members: [{ type: ObjectId, ref: 'User' }],
  },
  { timestamps: true }
)

const Room = mongoose.model('Room', roomSchema)

module.exports = Room
