import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "@/models/userModel";
import bcrypt from "bcryptjs"
import { connect } from "@/dbconfig/deconfig";

connect()

export async function POST(req:NextRequest) {
    try {
        const {new_password,token}=await req.json()
        
        if(!new_password || !token){
            return NextResponse.json({message: "Bad Request"},{status:400})
        }
        const decodeToken=jwt.verify(token, process.env.TOKEN_SECRET_FORGOTPASSWORD!) as JwtPayload
        if(!decodeToken){
            return NextResponse.json({message: "session expire"},{status: 400})
        }
        const user=await User.findById(decodeToken?.id)

        if(!user){
            return NextResponse.json({message: "user not found"},{status:400})
        }
        const salt = await bcrypt.genSalt(10);

        const hashpassword = await bcrypt.hash(new_password, salt);

        user.password=hashpassword

        await user.save()

        return NextResponse.json({message: "password has been successfully change you can login now"})
    } catch (error: any) {
        return NextResponse.json({message: "session expire"},{status: 400})
    }
}