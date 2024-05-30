import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connect } from "@/dbconfig/deconfig";
import { headers } from "next/headers";

connect();

export async function GET(req: NextRequest) {
  try {
    const header = headers()
    const btoken = header.get("Authorization")
    if (!btoken) {
      return NextResponse.json({ message: "Bearer token not define" },{status:403})
    }
    const token = btoken.split(' ').pop()

    const decoded: any = jwt.verify(token!, process.env.TOKEN_SECRET!);
    if(!decoded){
      return NextResponse.json({ message: "Session expired" }, { status: 401 });
    }
    const user = await User.findById(decoded?.id).populate({
      path: 'team',
      populate: [
        {
          path: 'dailylog'
        },
        {
          path: 'team',
          populate: {
            path: 'dailylog'
          }
        }
      ]
    })
    .populate('dailylog');
    
    
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
   

      return NextResponse.json({user:{
        id: user._id,
        name: user.name,
        email:user.email,
        phone: user.phone,
        address: user.address,
        isAdmin:user.isAdmin,
        team: user.team,
        dailylog: user.dailylog,
        role: user.role,
        profile: user.profile_image,
        cv: user.cv
      }},{status:200})

  } catch (error: any) {
    return NextResponse.json({ mesage: error.mesage }, { status: 500 });
  }
}

