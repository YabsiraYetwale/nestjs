import React, { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import SideNavbar from "@/components/SideNavbar";

interface Props {
  children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-y-5 gap-x-4 bg-white">
      <Navbar />
      <div className=" w-full flex justify-center ">
        <SideNavbar isAdmin={true} />
        <div className="py-20   w-full h-screen self-start overflow-y-scroll">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
