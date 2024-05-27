/** @format */
"use client";

import { useContext, useEffect, useState } from "react";
import { Nav } from "../ui/nav";
import { useWindowWidth } from "@react-hook/window-size";
import UserContext from "@/contextapi/userdetail/UserContext";
import {
  HandCoins,
  LayoutDashboard,
  UsersRound,
  CalendarPlus,
  Handshake,
  Building2,
  LucideIcon,
} from "lucide-react";

type NavLink = {
  title: string;
  href: string;
  icon: LucideIcon;
  variant: "default" | "ghost";
};

type Props = {};

export default function SideNavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobile_Width, setmobile_Width] = useState(false);
  const [mobilewidth_for_burger, setmobilewidth_for_burger] = useState(false);
  const { currUser } = useContext(UserContext);
  const onlyWidth = useWindowWidth();

  useEffect(() => {
    const mobileWidth = onlyWidth < 868;
    const mobileWidth_for_burger_nav = onlyWidth < 763;
    mobileWidth ? setmobile_Width(true) : setmobile_Width(false);
    mobileWidth_for_burger_nav
      ? setmobilewidth_for_burger(true)
      : setmobilewidth_for_burger(false);
  }, [onlyWidth]);



  const links: NavLink[] = [
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
  ];

  if (currUser && !currUser.isAdmin) {
    links.push({
      title: "Business",
      href: "/client-business",
      icon: Building2,
      variant: "ghost",
    });
  }
  if (currUser && currUser.isAdmin) {
    links.push({
      title: "Team Business",
      href: "/myteambusiness",
      icon: Building2,
      variant: "ghost",
    });
  }
  if (currUser && !currUser.isAdmin) {
    links.push({
      title: "Payout",
      href: "/payout-menu",
      icon: HandCoins,
      variant: "ghost",
    });
  }

  return (
    <>
      {!mobilewidth_for_burger ? (
        <div className="min-w-[80px] border-r px-3 pb-10 sticky top-0 h-screen">
          <div className="h-[70px] w-full flex items-center justify-center gap-1 border-b">
            <img
              className="h-[3vw] w-[3vw] object-contain"
              src="https://metalogic.com.np/metalogo.png"
              alt="logo"
            />
            {!isCollapsed && !mobile_Width && (
              <h1 className="font-bold text-ghost">Metalogic</h1>
            )}
          </div>
          
          <div></div>
          <Nav
            isCollapsed={mobile_Width ? true : isCollapsed}
            links={links}
          />
        </div>
      ) : null}
    </>
  );
}
