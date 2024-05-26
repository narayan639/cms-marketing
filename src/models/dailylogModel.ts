import mongoose from "mongoose";
import {User} from "./userModel"


const dailylogSchema = new mongoose.Schema({
  
   date: {
      type: Date,
      required: true,
   },
   time: {
      type: String,
      required: true
   },
   phonenumber:{
     type: String,
     required: true
   },
   client_name: {
      type: String,
      required: true,
   },
   company_name: {
      type: String,
      required: true,
   },
   budget: {
      type: String,
      required: true
   },
   address: {
      type: String,
      required: true
   },
   requirements: {
      type: String,
      required: true
   },
   feedback: {
      type: String,
      required: true
   },
   remarks: {
      type: String,
   },
   is_verify:{
      type: String,
      enum: ["verify", "not verify"],
      default: "not verify"
   },
   addby:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
   },
  
}, {timestamps: true});



export const Dailylog = mongoose.models.dailylogs || mongoose.model("dailylogs", dailylogSchema);
