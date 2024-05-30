import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connect } from "@/dbconfig/deconfig";
import { headers } from "next/headers";
import cloudinary from "@/lib/cloudinary";
import { utapi } from "@/utils/deleteimagefrom uploadthing";


connect();

export async function PUT(req: NextRequest) {
    try {
        const { userid } = await req.json()


        if (!userid) {
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
        const if_user_add = user.team.includes(userid)

        const delete_user=await User.findById(userid)

        if (isAdmin || if_user_add) {
            const updatedUsers = await User.updateMany(
                { team: userid },
                { $pull: { team: userid } }
            );

            if (!updatedUsers) {
                return NextResponse.json({ message: "Failed to update users" }, { status: 500 });
            }
            if (delete_user.profile_image) {
                    const match = delete_user.profile_image.match(/\/v\d+\/([^/]+\/[^.]+)\./);
                    const decodedString = decodeURIComponent(match[1]);
                    await cloudinary.v2.api.delete_resources([decodedString]);
               
            }

            if (delete_user.cv) {
                    const imagekey=delete_user?.cv.split("/").pop()
                    await utapi.deleteFiles(imagekey);
            }

            await User.findByIdAndDelete({_id: userid})


            return NextResponse.json({ message: "User deleted successfully" });
        
        } else {
            return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
        }

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}