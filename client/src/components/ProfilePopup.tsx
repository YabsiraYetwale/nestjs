"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { removeToken } from "@/actions/token";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "./ui/label";

interface Props {
  isAdmin?: boolean;
}

const ProfilePopup = ({ isAdmin }: Props) => {
  const router = useRouter();

  const handleSignOut = async () => {
    await removeToken();
    router.replace(`/sign-in`);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className="rounded-md cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col mr-5">
        <Label className="font-bold tracking-wide mb-2 px-2 ">My Account</Label>
        <Link href={isAdmin ? "/admin/me" : "/dashboard/me"}>
          <div className="h-8 mb-[3px] cursor-pointer flex items-center px-2 pb-0  hover:bg-zinc-100 rounded-md text-sm font-medium">
            Profile
          </div>
        </Link>

        <hr />
        <div
          onClick={handleSignOut}
          className="h-9 mt-[2px] cursor-pointer flex items-center px-2 pb-0  hover:bg-zinc-100 rounded-md text-sm font-medium"
        >
          Log out
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ProfilePopup;
