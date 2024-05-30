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

    const login_user = await User.findById(user._id).populate('team').populate('dailylog')

    const tokendata = {
      id: login_user._id,
      role: login_user.isAdmin === true ? "admin":"user",
    };
    const refresh_tokendata = {
      id: login_user._id
        };

    const accesstoken = jwt.sign(tokendata, process.env.TOKEN_SECRET as string, {
      expiresIn: 60 * 60 * 24,
    });
    const refreshtoken = jwt.sign(refresh_tokendata, process.env.TOKEN_SECRET_REFRESHTOKEN as string, {
      expiresIn: 30 * 60 * 60 * 24,
    });

    login_user.refreshtoken=refreshtoken
    await login_user.save()


    const response = NextResponse.json({
      user: {
        id: login_user._id,
        name: login_user.name,
        email: login_user.email,
        phone: login_user.phone,
        address: login_user.address,
        isAdmin: login_user.isAdmin,
        team: login_user.team,
        dailylog: login_user.dailylog,
        profile: login_user.profile_image,
        cv: login_user.cv
      },
      message: "Login Success"
    }, { status: 200 });

    response.cookies.set("token", accesstoken, {
      maxAge: 60 * 60 * 24
    })
    response.cookies.set('refreshtoken',refreshtoken,{
      httpOnly: true,
      secure: true,
      maxAge: 30*60*60*24
    })

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
