import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Settings } from "lucide-react";
import Link from "next/link";
import React from "react";

import { NotificationPopup } from "@/components/NotificationPopup";
import ProfilePopup from "@/components/ProfilePopup";
import Image from "next/image";
import CompanySelector from "./CompanySelector";

interface Props {
  isAdmin?: boolean;
}

const NavBar = ({ isAdmin }: Props) => {
  return (
    <div className="px-6 w-full h-16 bg-zinc-50 z-20 fixed flex items-center justify-between border-b-2 border-zinc-100 ">
      <Link href="/">
        <div className="flex gap-2 items-center">
          <Image
            src="/logo.png"
            className="w-10"
            alt="logo"
            width={55}
            height={0}
          />
          <p className="hidden md:block md:text-lg">Invoice System</p>
        </div>
      </Link>
      <Input
        placeholder="Search"
        className="w-36 md:w-52 lg:w-96 2xl:ml-52  xl:w-[500px] focus-visible:ring-zinc-200"
      />
      <div className="flex gap-4 ml-3 items-center xl:w-72 justify-around">
        <div className="flex gap-2">
          {!isAdmin && <CompanySelector />}
          <NotificationPopup isAdmin={isAdmin} />
        </div>
        <div className="flex gap-3">
          <Avatar className="bg-blue-200 cursor-pointer rounded-md items-center justify-center">
            <Settings size={19} className="text-blue-600" />
          </Avatar>
          <ProfilePopup isAdmin={isAdmin} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
