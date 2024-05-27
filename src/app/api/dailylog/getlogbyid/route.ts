import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/deconfig";
import { Dailylog } from "@/models/dailylogModel";

connect();

export async function POST(req: NextRequest) {
  try {
    const {log_id}=await req.json()
    if(!log_id){
      return NextResponse.json({message: "id required"},{status: 401})
    }
    const dailylog = await Dailylog.findById(log_id).populate('addby')
    if(!dailylog){
      return NextResponse.json({message: "Daily Log not Found"},{status: 401})
    }
    return NextResponse.json({dailylog})
  } catch (error: any) {
    return NextResponse.json({ mesage: error.mesage }, { status: 500 });
  }
}

