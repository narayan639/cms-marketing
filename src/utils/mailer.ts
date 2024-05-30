import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import { User } from "@/models/userModel";


export const emailType = ["VERIFY", "RESET"];

export const Sendmail = async ({
  email,
  emailtype,
  userID,
  message,
}: {
  email: string;
  emailtype: string;
  userID: number;
  message: string;
}) => {
  try {
    const hashtokken = await bcrypt.hash(userID.toString(), 10);

    if (emailtype === emailType[1]) {
      await User.findByIdAndUpdate(userID, {
        forgotPasswordToken: hashtokken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
      },
    });

    const mailOption = {
      from: '"CMS-Marketing" <narayan9limbu@gmail.com>',
      to: email,
      subject: emailtype === emailType[0] ? "Signup Details" : "Reset password",
      html: message,
    };

    const mailresponse = await transporter.sendMail(mailOption);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
