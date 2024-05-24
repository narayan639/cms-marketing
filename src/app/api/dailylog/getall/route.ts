import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/deconfig";
import { Dailylog } from "@/models/dailylogModel";

connect();

export async function GET(req: NextRequest) {
  try {
    const dailylog = await Dailylog.find()
    return NextResponse.json({dailylog})
  } catch (error: any) {
    return NextResponse.json({ mesage: error.mesage }, { status: 500 });
  }
}

