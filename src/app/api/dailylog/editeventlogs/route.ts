import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/deconfig";
import { User } from "@/models/userModel";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import { Dailylog } from "@/models/dailylogModel";


connect()


export async function PUT(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const { log_id,...rest } = reqBody

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

        const user = await User.findById(decoded?.id);
        if (!user) {
            return NextResponse.json({ message: "user not found" }, { status: 400 });
        }


        if (user?.dailylog.includes(log_id) || user.isAdmin) {

            const currLog = await Dailylog.findById(log_id)

            if (!currLog) {
                return NextResponse.json({ message: "Log not found" }, { status: 400 });
            }

           Object.assign(currLog, rest);

            await currLog.save();            

            return NextResponse.json({ message: "save change.", success: true });
        } else {
            return NextResponse.json({ message: "unauthorized" }, { status: 400 })
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}