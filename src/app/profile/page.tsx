"use client";
import PageTitle from "@/components/common/PageTitle";
import Container_with_nav from "@/components/ui/Container_with_nav";
import React, { useContext, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileCog, KeySquare, LogOut } from "lucide-react";
import { Phone } from "lucide-react";
import { MapPin } from "lucide-react";
import { Mail } from "lucide-react";
import { Settings } from "lucide-react";
import { GraduationCap } from 'lucide-react';
import { Scan } from 'lucide-react';
import { X } from 'lucide-react';


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import UserContext from "@/contextapi/userdetail/UserContext";

const page = () => {
  const route = useRouter();
  const { currUser } = useContext(UserContext)
  const [cv,setCv]=useState("")
  return (
    <Container_with_nav page_title="Profile">
      <PageTitle title="Profile" className="md:hidden" />
      <div className="relative">
        {
          currUser ?

            <div className="rounded-md w-full h-max p-2 sm:p-5 flex gap-4 sm:gap-10 bg-secondary mt-2 md:mt-0 relative  -z-10">
              <div className="circle h-[100px] sm:h-[20vw] md:h-[15vw] w-[120px] sm:w-[20vw] md:w-[15vw] relative cursor-pointer">
                <Avatar className="h-full w-full">
                  <AvatarImage src={`${currUser?.profile ? currUser?.profile : "https://github.com/shadcn.png"}`} />
                  <AvatarFallback>profile</AvatarFallback>
                </Avatar>
               
              </div>
              <div>
                <h1 className="font-semibold sm:text-[25px] md:text-[20px] lg:text-[1.5vw] text-secondary-foreground">
                  {currUser?.name}
                </h1>
                <p className="font-medium text-primary text-sm">
                  {
                    currUser?.isAdmin === true ? "Admin" : "Marketing Executive"
                  }

                </p>

                <div className="flex flex-col mt-5 gap-1 sm:gap-2 text-xs sm:text-sm">
                  <span className="flex items-center gap-2">
                    <Phone size={15} />
                    <p>{currUser?.phone}</p>
                  </span>
                  {
                    currUser?.address &&
                  <span className="flex items-center gap-2">
                    <MapPin size={15} />
                    <p>{currUser?.address}</p>
                  </span>
                  }
                  <span className="flex items-center gap-2">
                    <Mail size={15} />
                    <p>{currUser?.email}</p>
                  </span>
                </div>
              </div>
            </div> :
            <div className="border border-blue-100 shadow rounded-md p-4 w-full mt-4">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-200 h-36 w-36"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-12 bg-slate-200 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-12 bg-slate-200 rounded col-span-2"></div>
                      <div className="h-12 bg-slate-200 rounded col-span-1"></div>
                    </div>
                    <div className="h-12 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

        }

        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Settings
                className="absolute top-3 right-3 cursor-pointer transform duration-300 ease-in hover:rotate-[-45deg]"
                size={25}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-4">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => route.push("/changepassword")}>
                <KeySquare className="mr-2 h-4 w-4" />
                <span>Change Password</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => route.push("/editprofile")}>
                <FileCog className="mr-2 h-4 w-4" />
                <span>Edit profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>



      </div>
      {
        currUser?.isAdmin ===false &&
        <>
        {

          currUser?.cv ?
          <div className="mt-4 md:ml-2">
            <h1 className="font-semibold flex items-center gap-2 mb-1">My Resume <GraduationCap className="text-blue-500" /></h1>
              <iframe className="w-full md:w-[70%] lg:w-[50%] h-[400px] object-contain transform duration-300 ease-in-out" src={`${currUser?.cv}`}/>
          </div> :

          currUser &&
          <h1 className="mt-4">No Resume </h1>
        }
          </>

      }
      {/* {
        cv &&
      <div className="fixed top-0 left-0 bg-black/80 h-[100vh] w-full z-[9999999] flex items-center justify-center">
      <X className="text-white absolute top-4 right-4 cursor-pointer" onClick={()=>setCv('')}/>
        <div className="md:h-[95vh] h-[85vh] w-[90%] sm:w-[70%] md:w-[50%] lg:w-[35%] bg-white">
       <img className="h-full w-full object-contain" src={cv} alt="cv"/>
        </div>
      </div>
      } */}
    </Container_with_nav>
  );
};

export default page;
