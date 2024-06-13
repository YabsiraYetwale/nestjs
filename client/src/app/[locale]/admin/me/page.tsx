"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { profileSchema } from "@/schemas/profile";
import { getCookie } from "cookies-next";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { z } from "zod";
import { jwtDecode } from "jwt-decode";
import { User } from "@/models/user";
import { ProfileForm } from "@/components/form/ProfileForm";

const ProfilePage = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const token = getCookie("access-token")?.toString();
  let user = {} as User;

  if (token) {
    user = jwtDecode(token!) as User;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const handleSubmit = (values: z.infer<typeof profileSchema>) => {
    console.log(values);
  };

  return (
    <div className="h-full flex flex-col gap-16 px-4 xl:px-48 py-10 ">
      <div>
        <p className="font-bold text-xl">My profile</p>
        <p className="text-sm text-gray-400">Manage your profile settings</p>
      </div>
      <div className="flex flex-col gap-5">
        <p className="font-semibold">Your profile picture</p>
        <div className="flex flex-col-reverse lg:flex-row justify-between gap-3">
          <div className="flex items-center gap-3 lg:w-1/2">
            <Avatar className="w-32 h-32">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="picture"
                className="cursor-pointer text-sm flex items-center text-white px-3 rounded-md h-10 bg-violet-600 hover:bg-violet-500"
              >
                Change photo
              </label>
              <Button className=" flex gap-1  bg-zinc-50 hover:bg-zinc-100 hover:border-gray-400 text-black border-[1px] ">
                <TrashIcon color="red" size={17} /> Delete
              </Button>
            </div>
          </div>
          <div className="bg-gray-100 flex flex-col justify-center p-3 gap-2 lg:gap-5  rounded-lg lg:w-1/2  h-full">
            <p className="font-bold text-xl">Build confidence!</p>
            <p className="text-gray-400 text-md">
              Your photo will appear on emails and also to other users.
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-400">
          Add your photo. The recommended size is 256x256px
        </p>
      </div>
      <div className="flex flex-col-reverse lg:flex-row w-full">
        <ProfileForm
          user={user}
          onSubmit={handleSubmit}
          onImageChange={handleImageChange}
          selectedImage={selectedImage}
        />

        {selectedImage && (
          <div className="relative w-full h-80 bg-gray-100 rounded-md">
            <div className="flex flex-col w-full  ">
              <Image
                layout="fill"
                objectFit="contain"
                src={URL.createObjectURL(selectedImage)}
                alt="Profile picture"
              />
            </div>
            <Button
              className="w-full relative bottom-12"
              onClick={handleRemoveImage}
            >
              Remove
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
