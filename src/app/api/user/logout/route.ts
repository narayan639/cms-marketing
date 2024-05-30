import { connect } from "@/dbconfig/deconfig";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "@/models/userModel";

connect();

export async function GET(req: NextRequest) {
  try {
    const token=req.cookies.get('accesstoken')?.value
    if(!token){
      return NextResponse.json({message:"Unauthorized token!"})
    }

    const decordtoken=await jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload

   const user= await User.findById(decordtoken?.id).select('-password -refreshtoken')

   if(!user){
    return NextResponse.json({message:"Invalid accesss token!"})
   }

   user.refreshtoken=undefined
   await user.save()

    const response = NextResponse.json({
      message: "Logout Success",
      success: true,
    });
    response.cookies.set("accesstoken", "", {
      httpOnly: true,
      expires: new Date(),
    });
    response.cookies.set("refreshtoken", "", {
      httpOnly: true,
      expires: new Date(),
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ mesage: error.mesage }, { status: 500 });
  }
}
