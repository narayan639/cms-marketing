import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/deconfig";
import { User } from "@/models/userModel";

connect();

export async function GET(req: NextRequest) {
  try {
    const users = await User.find({ isAdmin: false }).select('-password -createdAt -updatedAt -team -__v')
    return NextResponse.json({users})
  } catch (error: any) {
    return NextResponse.json({ mesage: error.mesage }, { status: 500 });
  }
}

