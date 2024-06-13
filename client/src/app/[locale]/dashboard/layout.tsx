import SideNavbar from "@/components/SideNavbar";
import React, { ReactNode } from "react";
import Navbar from "@/components/Navbar";

interface Props {
  children: ReactNode;
}

const HomeLayout = ({ children }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-y-5 gap-x-4 bg-white">
      <Navbar />
      <div className=" w-full flex justify-center ">
        <SideNavbar isAdmin={false} />
        <div className="py-20 px-4 md:px-8  w-full h-screen self-start overflow-y-scroll">
          {children}
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
