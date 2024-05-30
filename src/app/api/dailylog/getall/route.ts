import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/deconfig";
import { Dailylog } from "@/models/dailylogModel";
import { headers } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "@/models/userModel";

connect();

export async function GET(req: NextRequest) {
  try {
    const header = headers();
    const btoken = header.get("Authorization");
    if (!btoken) {
      return NextResponse.json({ message: "Bearer token not defined" }, { status: 403 });
    }
    const token = btoken.split(' ').pop();

    const decoded = jwt.verify(token!, process.env.TOKEN_SECRET!) as JwtPayload

    if (!decoded) {
      return NextResponse.json({ message: "Session expired" });
    }

    const user = await User.findById(decoded?.id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    const dailylog = await Dailylog.find().sort({ createdAt: -1 }).populate({
      path: 'addby',
      select: 'name email phone _id'
    });

    return NextResponse.json({ dailylog });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
