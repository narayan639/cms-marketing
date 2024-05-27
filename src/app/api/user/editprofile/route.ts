import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/deconfig";
import { User } from "@/models/userModel";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";


connect()


export async function PUT(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const { userid, name, email, phone, address, cv, profile_image } = reqBody

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
        if (user._id == userid || user.isAdmin) {

            const currUser = await User.findById(userid)

            if (!currUser) {
                return NextResponse.json({ message: "user not found" }, { status: 400 });
            }
            const checkemail = await User.findOne({email})

            if (checkemail) {
                return NextResponse.json({ message: "Email already taken!" }, { status: 400 });
            }

            currUser.name = name
            currUser.email = email
            currUser.phone = phone
            currUser.address = address
            currUser.cv = cv ? cv : ""
            currUser.profile_image = profile_image ? profile_image : ""

            await currUser.save()
            return NextResponse.json({ message: "save change.", success: true });
        } else {
            return NextResponse.json({ message: "unauthorized" }, { status: 400 })
        }


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}