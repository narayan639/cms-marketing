import bcrypt from "bcryptjs"
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/deconfig";
import { User } from "@/models/userModel";
import { Sendmail, emailType } from "@/utils/mailer";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";


connect()

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const { name, email, phone, address_province,address_district,address_municipility, cv } = reqBody
        if (!name || !email || !phone || !address_province || !address_district || !address_municipility) {
            return NextResponse.json({ error: "Bad Request" }, { status: 400 });

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
            return NextResponse.json({
                message: "user not found!",
            }, { status: 400 });
        }


        if (user.user_status === "pending") {
            return NextResponse.json(
                { message: "you can not add team currently!" },
                { status: 400 }
            )
        }
        const newuser = await User.findOne({ email });

        if (newuser) {
            return NextResponse.json(
                { message: "User already exit" },
                { status: 400 }
            );
        }
        const password = Math.floor(100000 + Math.random() * 900000).toString();


        const newUser = new User({
            email,
            phone,
            name,
            address: `${address_province}, ${address_district}, ${address_municipility}`,
            password,
            cv
        });

        const savedUser = await newUser.save();

        user.team = [...user.team, savedUser._id]

        await user.save()
        return NextResponse.json({ message: "Team added.", success: true });

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { userid } = await req.json()
        
        if(!userid){
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
        
        const user = await User.findOne({ _id: userid })

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }
        const password = user.password.toString()

        const salt = await bcrypt.genSalt(10);

        const hashpassword = await bcrypt.hash(user.password, salt);


        user.user_status = "approved"

        user.password = hashpassword

        const savedUser = await user.save()

        await Sendmail({
            email: savedUser?.email,
            emailtype: emailType[0],
            userID: userid,
            message: `
            <div className="flex flex-col">
            <h3>please Signup with follwoing email and password</h3>
            <h4>
            Email: ${savedUser?.email}
            </h4>
            <strong>
            password: ${password}
            </h4>
            <h4 className="flex">login Url:  
            ${process.env.DOMAIN}/login
            </h4>
          
            <p classNmae="text-[18px] mt-5">
            Thank you!
            </p>
            </div>`,
        });

        return NextResponse.json({ message: "user approved.", success: true });


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}