const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = require("mongoose").Types.ObjectId;
const constant = require("../../constants");

const userSchema = new Schema(
  {
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true },
    userType: {
      type: String,
      enum: constant.userType,
      required: true,
      default: "USER",
    },
    status: {
      type: String,
      enum: constant.status,
      required: true,
      default: "REGISTER",
    },
    profileImage: { type: String, required:true, trim: true, default:'https://res.cloudinary.com/dgcofw79q/image/upload/v1701177663/profilePhoto/fugkdrfmdwam3ayzsgl2.webp' }
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
