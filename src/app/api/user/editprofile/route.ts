import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/deconfig";
import { User } from "@/models/userModel";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import cloudinary from "@/lib/cloudinary";
import { utapi } from "@/utils/deleteimagefrom uploadthing";

connect();

export async function PUT(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { userid, name, email, phone, address, cv, profile_image } = reqBody;

        const header = headers();
        const btoken = header.get("Authorization");
        if (!btoken) {
            return NextResponse.json({ message: "Bearer token not defined" }, { status: 400 });
        }

        const token = btoken.split(' ').pop();

        const decoded: any = jwt.verify(token!, process.env.TOKEN_SECRET!);

        if (!decoded) {
            return NextResponse.json({ message: "Session expired" }, { status: 400 });
        }

        const user = await User.findById(decoded.id);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 400 });
        }
        const currUser = await User.findById(userid);

        if (!currUser) {
            return NextResponse.json({ message: "User not found" }, { status: 400 });
        }

        if (user._id.toString() === userid || user.isAdmin) {
            // Check if the email is changing
            if (email !== currUser.email) {
                const checkEmail = await User.findOne({ email });
                if (checkEmail) {
                    return NextResponse.json({ message: "Email already taken!" }, { status: 400 });
                }
            }

            if (profile_image && currUser.profile_image !== profile_image) {
                if (currUser.profile_image) {
                    const match = currUser.profile_image.match(/\/v\d+\/([^/]+\/[^.]+)\./);
                    const decodedString = decodeURIComponent(match[1]);
                    await cloudinary.v2.api.delete_resources([decodedString]);
                }
                currUser.profile_image = profile_image;
            }

            if (cv && currUser.cv !== cv) {
                if (currUser.cv) {
                    const imagekey=currUser?.cv.split("/").pop()
                    await utapi.deleteFiles(imagekey);
                }
                currUser.cv = cv;
            }

            // Update user fields
            currUser.name = name;
            currUser.email = email;
            currUser.phone = phone;
            currUser.address = address;
            currUser.cv = cv ? cv : "";
            currUser.profile_image = profile_image ? profile_image : "";

            await currUser.save();
            return NextResponse.json({ message: "Changes saved.", success: true });
        } else {
            return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
        }

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
