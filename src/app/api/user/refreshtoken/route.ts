import { connect } from "@/dbconfig/deconfig";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "@/models/userModel";

connect();

export async function GET(req: NextRequest) {
  try {
    const refreshtoken=req.cookies.get('refreshtoken')?.value
    if(!refreshtoken){
      return NextResponse.json({message:"Unauthorized request!"},{status:401})
    }

    const decordtoken=await jwt.verify(refreshtoken, process.env.TOKEN_SECRET_REFRESHTOKEN!) as JwtPayload

   const user= await User.findById(decordtoken?.id).select('-password -refreshtoken')

   if(!user){
    return NextResponse.json({message:"Invalid refresh token!"},{status:401})
   }

   if(refreshtoken !== user?.refreshtoken){
    return NextResponse.json({message:"Invalid refresh token!"},{status:401})

   }
   const tokendata = {
    id:user._id,
    role:user.isAdmin === true ? "admin":"user",
  };
  const refresh_tokendata = {
    id:user._id
    };

  const accesstoken = jwt.sign(tokendata, process.env.TOKEN_SECRET as string, {
    expiresIn: 60 * 60 * 24,
  });
  const new_refreshtoken = jwt.sign(refresh_tokendata, process.env.TOKEN_SECRET_REFRESHTOKEN as string, {
    expiresIn: 30 * 60 * 60 * 24,
  });
   user.refreshtoken=new_refreshtoken
   await user.save()

   const response = NextResponse.json({
    user: {
      id:user._id,
      name:user.name,
      email:user.email,
      phone:user.phone,
      address:user.address,
      isAdmin:user.isAdmin,
      team:user.team,
      dailylog:user.dailylog,
      profile:user.profile_image,
      cv:user.cv
    },
    message: "Token refresh"
  }, { status: 200 });

  response.cookies.set("token", accesstoken, {
    maxAge: 60 * 60 * 24
  })
  response.cookies.set('refreshtoken',new_refreshtoken,{
    httpOnly: true,
    secure: true,
    maxAge: 30*60*60*24
  })

  return response;
  } catch (error: any) {
    return NextResponse.json({ mesage: error.mesage }, { status: 500 });
  }
}
