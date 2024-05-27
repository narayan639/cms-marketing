import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connect } from "@/dbconfig/deconfig";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    const user = await User.findOne({ email });

    if (!user) {
        return NextResponse.json({
            message: "User not registered!",
            success: false,
        }, { status: 400 });
    }

    if (user.user_status === "pending") {
      return NextResponse.json({
        message: "You are not approved by admin yet!",
        success: false,
      }, { status: 400 });
    }

    const valid_password = await bcrypt.compare(password, user.password);

    if (!valid_password) {
      return NextResponse.json({
        message: "Check your credentials",
        success: false,
      }, { status: 400 });
    }

    const populatedUser = await User.findById(user._id).populate('team').populate('dailylog')

    const tokendata = {
      id: populatedUser._id,
      role: populatedUser.isAdmin === true ? "admin":"user",
    };

    const token = jwt.sign(tokendata, process.env.TOKEN_SECRET as string, {
      expiresIn: 60 * 60 * 24,
    });

    const response = NextResponse.json({
      user: {
        id: populatedUser._id,
        name: populatedUser.name,
        email: populatedUser.email,
        phone: populatedUser.phone,
        address: populatedUser.address,
        isAdmin: populatedUser.isAdmin,
        team: populatedUser.team,
        dailylog: populatedUser.dailylog,
        profile: populatedUser.profile_image,
        cv: populatedUser.cv
      },
      message: "Login Success"
    }, { status: 200 });

    response.cookies.set("token", token, {
      maxAge: 60 * 60 * 24
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
