import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connect } from "@/dbconfig/deconfig";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";


connect();
export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { password, new_password } = reqBody;
    
    if(!password || !new_password){
      return NextResponse.json({message: "Bad request"},{status:400})
    }
    const header = headers()
    const btoken = header.get("Authorization")
    if (!btoken) {
      return NextResponse.json({ message: "Bearer token not define" },{status:400})
    }
    
    const token = btoken.split(' ').pop()
    
    const decoded: any = jwt.verify(token!, process.env.TOKEN_SECRET!);
    if(!decoded){
      return NextResponse.json({message: "Session expire"})
    }
    const user = await User.findById(decoded?.id);


 
    if (!user) {
      return NextResponse.json({
        message: "user not found!",
      },{status: 400});
    }

    const valid_password = await bcrypt.compare(password, user.password);

    if (!valid_password) {
      return NextResponse.json({
        message: "check your credentials",
        success: false
      },{status: 400});
    }

    const salt = await bcrypt.genSalt(10);

    const hashpassword = await bcrypt.hash(new_password, salt);

    user.password = hashpassword;

    const saveUser = await user.save();

    if (saveUser) {
      return NextResponse.json({
        message: "Password successfully change",
        success: true
      },{status: 200});
    }
    return NextResponse.json({
      message: "Unable Password change",
    },{status: 400});
  } catch (error: any) {
    return NextResponse.json({ mesage: error.mesage }, { status: 500 });
  }
}
