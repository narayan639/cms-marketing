/** @format */
"use client";

import { useEffect, useState } from "react";
import { Nav } from "../ui/nav";


type Props = {};

import {
  HandCoins,
  LayoutDashboard,
  UsersRound,
  Settings,
  ChevronRight,
  CalendarPlus,
  Handshake,
  Building2,
} from "lucide-react";

import { Button } from "../ui/button";

import { useWindowWidth } from "@react-hook/window-size";

export default function SideNavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobile_Width, setmobile_Width] = useState(false);
  const [mobilewidth_for_burger, setmobilewidth_for_burger] = useState(false);

  const onlyWidth = useWindowWidth();
  useEffect(() => {
    const mobileWidth = onlyWidth < 868;
    const mobileWidth_for_burger_nav = onlyWidth < 763;
    mobileWidth ? setmobile_Width(true) : setmobile_Width(false);
    mobileWidth_for_burger_nav
      ? setmobilewidth_for_burger(true)
      : setmobilewidth_for_burger(false);
  }, [onlyWidth]);

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
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
          {!mobile_Width && (
            <div className="absolute right-[-20px] bottom-[50px] z-[999]">
              <Button
                onClick={toggleSidebar}
                variant="secondary"
                className=" rounded-full p-2 bg-blue-800 hover:bg-blue-600 text-white relative z-[99999]"
              >
                <ChevronRight
                  className={`${
                    isCollapsed
                      ? "rotate-[0deg] transform duration-500 ease-in-out"
                      : "rotate-[180deg] transform duration-500 ease-in-out"
                  }`}
                />
              </Button>
            </div>
          )}
          <div></div>
          <Nav
            isCollapsed={mobile_Width ? true : isCollapsed}
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
                title: "My Teams",
                href: "/teams",
                icon: Handshake,
                variant: "ghost",
              },
              {
                title: "My Business",
                href: "/business",
                icon: Building2,
                variant: "ghost",
              },
              {
                title: "Payout Menu",
                href: "/payout-menu",
                icon: HandCoins,
                variant: "ghost",
              },
              {
                title: "Settings",
                href: "/settings",
                icon: Settings,
                variant: "ghost",
              },
            ]}
          />
        </div>
      ) : (
        null
        
      )}
    </>
  );
}
