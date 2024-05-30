import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/deconfig";
import { User } from "@/models/userModel";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import { Dailylog } from "@/models/dailylogModel";


connect()


export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const { date, time, client_name, company_name, requirements, feedback, budget, address, remarks } = reqBody

        if (!date || !time || !client_name || !company_name || !requirements || !feedback || !budget || !address) {
            return NextResponse.json({ message: "Bad Request" }, { status: 400 })
        }

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

        const create_new_log = new Dailylog({
            addby: user._id,
            ...reqBody
        }
        )
        const save_log = await create_new_log.save()

        user.dailylog = [...user.dailylog, save_log._id]

        await user.save()

        return NextResponse.json({ message: "Daily log added.", success: true });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

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
            return NextResponse.json({ message: "user not found" }, { status: 400 });
        }
        if (user.isAdmin !== true) {
            return NextResponse.json({ message: "Not Admin" }, { status: 400 });
        }
        const log = await Dailylog.findById({ _id: log_id })

        if (!log) {
            return NextResponse.json({ message: "Daily log not found" }, { status: 400 });
        }

        log.is_verify = "verify"

        await log.save()

        return NextResponse.json({ message: "Daily log verify.", success: true });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}