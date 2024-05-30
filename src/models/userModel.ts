import mongoose from "mongoose";
import { Dailylog } from "./dailylogModel";

const userSchema = new mongoose.Schema({
   profile_image: String,
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   phone: {
      type: String,
      required: true
   },
   address: {
      type: String,
   },
   user_status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending"
   },
   role: {
      type: String,
      enum: ["Admin", "Marketing Executive"],
      default: "Marketing Executive"
   },
   cv: String,
   password: {
      type: String,
      required: true
   },
   isAdmin: {
      type: Boolean,
      default: false
   },
   team: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "users"
   },
   addby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
   },
   dailylog:{
      type: [mongoose.Schema.Types.ObjectId],
      ref: Dailylog.modelName,
   },
   refreshtoken: String,
}, {timestamps: true});


export const User = mongoose.models.users || mongoose.model("users", userSchema);
