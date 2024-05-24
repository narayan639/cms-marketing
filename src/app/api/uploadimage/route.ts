import { Uploadimage } from "@/lib/uploadimage";
import { NextRequest, NextResponse } from "next/server";

export const POST=async(req: NextRequest)=>{
   const formdata=await req.formData()

   const image=formdata.get('image') as unknown as File;
   console.log(image)

   const data: any=await Uploadimage(image,"Folder x")

   return NextResponse.json({msg: data?.secure_url},{
    status: 200
   })
}