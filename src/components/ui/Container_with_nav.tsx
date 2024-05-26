"use client"
import React, { useContext, useState } from "react";
import Mobile_nav from "./mobile_nav";
import PageTitle from "../common/PageTitle";
import UserContext from "@/contextapi/userdetail/UserContext";
import { Bell, FileCog, KeySquare, LogOut, Slash } from 'lucide-react';
import { FaChevronDown } from "react-icons/fa6";
import {
  HandCoins,
  LayoutDashboard,
  UsersRound,
  Settings,
  ChevronRight,
  CalendarPlus,
  Handshake,
  Building2,
} from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { getDailylogs } from "@/app/apiconnect/fetch";
import { Nav } from "./nav";

interface Iprop {
  children: React.ReactNode;
  page_title?: string;
}
const Container_with_nav: React.FC<Iprop> = ({ children, page_title }) => {
  const[open,setOpen]=useState(false)
  const [opensidebar, setOpensidebar] = useState(false);

  const { currUser,setCurrUser } = useContext(UserContext)
  const route =useRouter()
  const {data: Allogs}=useQuery("logs", getDailylogs)

  const unverify_log=Allogs?.data.dailylog.filter((i: any)=>i.is_verify=="not verify")

  const handleLogout = async () => {
    const res = await axios.get(
      "/api/user/logout",
    );
    if (res) {
      setCurrUser(null);
      toast.success(res.data?.message)
      route.push("/login")
    }
  };
  
  return (
    <div>

      <div className="w-full h-[70px] flex justify-between bg-secondary md:relative md:flex items-center md:px-4 sticky top-0 z-10">
        <div className="hidden md:flex">
          <PageTitle title={page_title} />
        </div>
        <Mobile_nav />
        <div className="flex items-center md:gap-5 relative">
          {
            currUser?.isAdmin &&
          <div className="cursor-pointer relative" onClick={()=>route.push("/daily-log")}>
            <span className=" absolute animate-bounce top-[-10px] right-[-5px] bg-red-500 text-white h-5 w-5 flex items-center justify-center rounded-full text-xs">{unverify_log?.length}</span>
            <Bell />
          </div>
          }
          <div className="flex items-center gap-2 py-1 pl-2 md:px-3 rounded-lg md:bg-white relative">
            <Avatar onClick={()=>route.push("/profile")}>
              <AvatarImage src={`${currUser?.profile ? currUser?.profile :"https://github.com/shadcn.png"}`} alt="@shadcn" />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <h1 className="hidden md:flex md:font-medium">
              {currUser?.name}
            </h1>

            <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger className="outline-none">
            <FaChevronDown size={20} className={`hidden md:block cursor-pointer transform duration-300 ease-in-out bg-secondary p-1 rounded-full ${open? "rotate-180":"rotate-20"}`}/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-4 mt-4">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => route.push("/changepassword")}>
                <KeySquare className="mr-2 h-4 w-4 " />
                <span>Change Password</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => route.push("/editprofile")}>
                <FileCog className="mr-2 h-4 w-4" />
                <span>Edit profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />


              <DropdownMenuItem onClick={()=>handleLogout()}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>


            </DropdownMenuContent>
          </DropdownMenu>

          </div>
        </div>

        <div className="md:hidden">
        <div
              onClick={() => setOpensidebar(!opensidebar)}
              className=" h-[45px] w-[45px] flex-col gap-3 rounded-md bg-transparent text-primary hover:bg-transparent flex items-center justify-center"
            >
              <Slash
                className={`${
                  opensidebar
                    ? "rotate-[180deg] absolute top-[22px]"
                    : "rotate-[45deg] absolute top-[14px]"
                } transform duration-300 ease-in`}
              />
              <Slash
                className={`${
                  opensidebar
                    ? "absolute bottom-[24px] opacity-0"
                    : "rotate-[45deg] absolute bottom-[14px]"
                } transform duration-300 ease-in`}
              />
              <Slash
                className={`${
                  opensidebar
                    ? "rotate-[90deg] absolute bottom-[24px]"
                    : "rotate-[45deg] absolute bottom-[]"
                } transform duration-300 ease-in`}
              />
            </div>
            <div
            style={{ height: "calc(100vh - 70px)" }}
            className={`fixed bg-primary w-[300px] text-white top-[70px] z-40 ${
              !opensidebar ? "left-[-500px]" : "left-0"
            } transform duration-500 ease-in-out `}
          >
            <Nav
              openside_bar={() => setOpensidebar(!opensidebar)}
              links={[
                {
                  title: "Dashboard",
                  href: "/",
                  icon: LayoutDashboard,
                  variant: "default",
                },
                {
                  title: "Profile",
                  href: "/profile",
                  icon: UsersRound,
                  variant: "ghost",
                },
                {
                  title: "Daily Log",
                  href: "/daily-log",
                  icon: CalendarPlus,
                  variant: "ghost",
                },
                {
                  title: "Teams",
                  href: "/teams",
                  icon: Handshake,
                  variant: "ghost",
                },
                {
                  title: "Business",
                  href: "/business",
                  icon: Building2,
                  variant: "ghost",
                }
              ]}
            />
          </div>
          </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};

export default Container_with_nav;
