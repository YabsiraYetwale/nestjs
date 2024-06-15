import React from "react";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import Users from "./Users";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function UsersPage() {
  return (
    <>
      <div className="flex w-full mx-5  justify-center">
        <div className="flex flex-col items-center gap-5 w-full max-w-7xl ">
          <div className=" w-full flex justify-between">
            <PageTitle title="Users" />
            <Button className="bg-blue-600 hover:bg-blue-500 w-[100px] h-[35px] ">
              <Link href="users/addUser">Add New</Link>
            </Button>
          </div>
          <Users />
        </div>
      </div>
      <ScrollToTopButton />
    </>
  );
}
