"use client";

import { useState } from "react";
import { Nav } from "./ui/nav";

interface Props {
  isAdmin: boolean;
}

import { ChevronRight, LucideIcon } from "lucide-react";
import { Button } from "./ui/button";

import { useWindowWidth } from "@react-hook/window-size";
import { adminLinks, regularLinks } from "@/data/sidebar";

export default function SideNavbar({ isAdmin }: Props) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className={` bg-zinc-50 z-10 border-r px-3 pt-0 sm:pt-32`}>
      <div
        className={`absolute hidden md:block ${
          !isCollapsed ? "md:left-14" : "md:left-36"
        } z-10  top-20   `}
      >
        <Button
          onClick={toggleSidebar}
          variant="secondary"
          className=" rounded-full hover:bg-zinc-50 bg-white border-zinc-200 border-[1px] p-2"
        >
          <ChevronRight />
        </Button>
      </div>

      <div
        onClick={() => setIsCollapsed(false)}
        className={`block bg-transparent bg-zinc-50 pt-32 sm:pt-0   border-s-zinc-200 sm:w-full w-[50px] h-[100vh] relative `}
      >
        <Nav
          isCollapsed={mobileWidth ? true : !isCollapsed}
          links={isAdmin ? adminLinks : regularLinks}
        />
      </div>
    </div>
  );
}
