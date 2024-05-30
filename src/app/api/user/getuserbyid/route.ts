import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/deconfig";
import { User } from "@/models/userModel";

connect();

export async function POST(req: NextRequest) {
  try {
    const {user_id}=await req.json()
    if(!user_id){
      return NextResponse.json({message: "id required"},{status: 401})
    }
    const user = await User.findById(user_id).populate({
      path: 'team',
      populate: {
        path: 'dailylog'}
    }).populate('dailylog')
    if(!user){
      return NextResponse.json({message: "User not Found"},{status: 401})
    }

    return NextResponse.json({user})
  } catch (error: any) {
    return NextResponse.json({ message: error.mesage }, { status: 500 });
  }
}

