import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/deconfig";

connect();

export async function GET(req: NextRequest) {
  try {
    const users = await User.find({}, 'email'); 
    const emails = users.map(user => user.email); 
    return NextResponse.json({emails})
  } catch (error: any) {
    return NextResponse.json({ mesage: error.mesage }, { status: 500 });
  }
}

