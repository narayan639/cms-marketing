import axios from "axios";


export const getUsers=async()=>{
    const res=await axios.get("/api/user/allusers")
    return res
 }
export const getEmails=async()=>{
    const res=await axios.get("/api/user/getallmails")
    return res
 }
export const getDailylogs=async()=>{
    const res=await axios.get("/api/dailylog/getall")
    return res
 }