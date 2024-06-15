"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOutIcon, User } from "lucide-react";
import { removeToken } from "@/actions/token";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ProfilePopup = () => {
  const [popUp, setPopUp] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setPopUp(false);
    await removeToken();
    router.replace("/sign-in");
  };

  return (
    <>
      <Avatar
        className="rounded-md cursor-pointer"
        onClick={() => setPopUp(!popUp)}
      >
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      {popUp && (
        <div className="border-[1px] border-zinc-100 absolute top-16 right-2 w-60 h-72 bg-white rounded-b-lg shadow-md px-5 py-3">
          <Link href="me">
            <div className="flex cursor-pointer gap-5 w-full h-10 rounded-md hover:bg-gray-200 items-center">
              <User size={19} /> Edit Profile
            </div>
          </Link>
          <div
            onClick={handleSignOut}
            className="flex cursor-pointer gap-5 w-full h-10 rounded-md hover:bg-gray-200 items-center"
          >
            <LogOutIcon size={19} /> Sign out
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePopup;
