"use client";

import SideNavbar from "@/components/SideNavbar";
import React, { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import useCompanyStore from "@/state-management/selected_company/store";
import NoCompany from "@/components/NoCompany";
import CompanySelector from "@/components/CompanySelector";

interface Props {
  children: ReactNode;
}

const HomeLayout = ({ children }: Props) => {
  const doesHaveCompany = true;
  const { selectedCompanyId } = useCompanyStore();

  return (
    <div className="grid grid-cols-1 gap-y-5 gap-x-4 bg-white">
      <Navbar />

      {doesHaveCompany ? (
        selectedCompanyId ? (
          <div className=" w-full flex justify-center ">
            <SideNavbar isAdmin={false} />
            <div className="py-20 px-4 md:px-8  w-full h-screen self-start overflow-y-scroll">
              {children}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-screen">
            <CompanySelector />
          </div>
        )
      ) : (
        <NoCompany />
      )}
    </div>
  );
};

export default HomeLayout;
