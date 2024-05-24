import bcrypt from "bcryptjs"
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/deconfig";
import { User } from "@/models/userModel";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import { Dailylog } from "@/models/dailylogModel";


connect()



export async function PUT(req: NextRequest) {
    try {
        const { log_id } = await req.json()
        
        if(!log_id){
            return NextResponse.json({message: "Bad Request"},{status: 400})
        }
        
        const header = headers()
        const btoken = header.get("Authorization")
        if (!btoken) {
            return NextResponse.json({ message: "Bearer token not define" }, { status: 400 })
        }
        
        const token = btoken.split(' ').pop()
        
        const decoded: any = jwt.verify(token!, process.env.TOKEN_SECRET!);
        
        if (!decoded) {
            return NextResponse.json({ message: "Session expire" })
        }
        
        const Admin = await User.findById(decoded?.id);
        
        if (!Admin) {
            return NextResponse.json({ message: "user not found" }, { status: 400 });
        }
        
        if (!Admin.isAdmin) {
            return NextResponse.json({ message: "Not Admin" }, { status: 400 });
        }

        const dailylog=await Dailylog.findById(log_id)

        if(!dailylog){
            return NextResponse.json({message: "Daily Log Not Found"},{status:404})
        }

        dailylog.is_verify="verify"

        await dailylog.save()

        return NextResponse.json({ message: "Daily log verify.", success: true });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}