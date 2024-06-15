import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const NoCompany = () => {
  return (
    <div className=" h-screen flex flex-col  self-center ">
      <div className="flex flex-col gap-3 py-10 items-center px-4  mt-20">
        <p className="text-xl font-semibold text-gray-700">
          You have no company registered.
        </p>
        <p className="text-sm text-gray-500">
          Please register your company or ask a company admin to make you a
          member.
        </p>
        <Link href="companies/new">
          <Button className="bg-blue-600 hover:bg-blue-500 w-[100px] h-[35px] ">
            Add New
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NoCompany;
