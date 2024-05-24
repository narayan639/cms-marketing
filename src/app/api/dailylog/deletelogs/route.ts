import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connect } from "@/dbconfig/deconfig";
import { headers } from "next/headers";
import { Dailylog } from "@/models/dailylogModel";

connect();

export async function PUT(req: NextRequest) {
    try {
        const { log_id } = await req.json()


        if (!log_id) {
            return NextResponse.json({ message: "Bad Request" }, { status: 400 })
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

        const user = await User.findById(decoded?.id);

        if (!user) {
            return NextResponse.json({ message: "user not found" })
        }

        const isAdmin = user.isAdmin
        const if_user_add = user.dailylog.includes(log_id)

        if (isAdmin || if_user_add) {
            const updatedUsers = await User.updateMany(
                { dailylog: log_id },
                { $pull: { dailylog: log_id } }
            );

            if (!updatedUsers) {
                return NextResponse.json({ message: "Failed to update users" }, { status: 500 });
            }

            await Dailylog.findByIdAndDelete({_id: log_id})

            return NextResponse.json({ message: "Daily log deleted successfully" });
        
        } else {
            return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
        }

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}