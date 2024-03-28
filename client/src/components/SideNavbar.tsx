/** @format */
"use client";

import { useState } from "react";
import { Nav } from "./ui/nav";

type Props = {};

import {
  Activity,
  LayoutDashboard,
  UsersRound,
  Users,
  Settings,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";

import { useWindowWidth } from "@react-hook/window-size";

export default function SideNavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div
      className={`relative z-10 sm:mi-w-[80px]  sm:border-r sm:px-3 pb-10 pt-24 `}
    >
      {
        <div className="absolute sm:right-[-20px] sm:top-7 sm:hidden md:block top-3">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className=" rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      }
      <div
        onClick={()=>setIsCollapsed(false)}
        className={`sm:block ${
          isCollapsed ? true : "hidden"
        } sm:bg-transparent bg-zinc-100 py-2 border-b border-s-zinc-200 sm:w-full w-[80px] h-[100vh] sm:relative fixed`}
      >
        <Nav
          isCollapsed={mobileWidth ? true : isCollapsed}
          links={[
            {
              title: "Dashboard",
              href: "/",
              icon: LayoutDashboard,
              variant: "default",
            },
            {
              title: "Invoices",
              href: "/invoices",
              icon: Activity,
              variant: "ghost",
            },
            {
              title: "Customers",
              href: "/customers",
              icon: UsersRound,
              variant: "ghost",
            },
            {
              title: "Users",
              href: "/users",
              icon: Users,
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
    </div>
  );
}
