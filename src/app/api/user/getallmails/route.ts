import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/deconfig";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";

connect();

export async function GET(req: NextRequest) {
  try {
    const header = headers()
    const btoken = header.get("Authorization")
    if (!btoken) {
        return NextResponse.json({ message: "Bearer token not define" }, { status: 403 })
    }
    
    const token = btoken.split(' ').pop()
    
    const decoded: any = jwt.verify(token!, process.env.TOKEN_SECRET!);
    
    if (!decoded) {
        return NextResponse.json({ message: "Session expire" })
    }
    
    const user = await User.findById(decoded?.id);
    
    if (!user) {
        return NextResponse.json({ message: "user not found" }, { status: 400 });
    }
    const users = await User.find({}, 'email'); 
    const emails = users.map(user => user.email); 
    return NextResponse.json({emails})
  } catch (error: any) {
    return NextResponse.json({ mesage: error.mesage }, { status: 500 });
  }
}

