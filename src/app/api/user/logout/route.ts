import { connect } from "@/dbconfig/deconfig";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
  try {
    const response = NextResponse.json({
      message: "Logout Success",
      success: true,
    });
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(),
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ mesage: error.mesage }, { status: 500 });
  }
}
