import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Sendmail, emailType } from "@/utils/mailer";
import { connect } from "@/dbconfig/deconfig";


connect()

export async function POST(req:NextRequest) {
    try {
        const reqBody=await req.json()
        const {email}=reqBody
        if(!email){
            return NextResponse.json({message: "Bad request"},{status:400})
        }
        const user=await User.findOne({email})

        if(!user){
            return NextResponse.json({message: "User not found!"},{status:400})
        }
        const tokendata = {
            id: user._id,
        };
        const token = jwt.sign(tokendata, process.env.TOKEN_SECRET_FORGOTPASSWORD as string, {
            expiresIn: '1h',
        });
        await Sendmail({
            email: email,
            emailtype: emailType[1],
            userID: user?._id,
            message:`
            <div className="flex flex-col">
            
            <h4 className="flex">Reset Url:  
            ${process.env.DOMAIN}/reset-password/${user?._id}/${token}
            </h4>
          
            </div>`,
        });
        return NextResponse.json({message:"Email sent to you email for reset password"},{status:200})
    } catch (error: any) {
        return NextResponse.json({message: error?.message},{status:400})
    }
   
}