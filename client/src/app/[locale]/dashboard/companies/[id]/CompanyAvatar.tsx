import React from "react";
import Image from "next/image";

import sampleLogo from "../../../../../public/Titan_Company_Logo.png";
import { Company } from "@/models/company";

interface Props {
  company: Company;
}

const CompanyAvatar = ({ company: { logo_url, email, name } }: Props) => {
  return (
    <div className="flex gap-4">
      <div className="relative bg-white bottom-14 h-32 w-32 rounded-full p-1 border-gray-300 border-2">
        <Image className=" object-cover" alt="Company Logo" src={sampleLogo} />
      </div>
      <div className="flex flex-col mt-2">
        <p className=" font-bold text-xl tracking-wide">{name}</p>
        <p className="text-gray-400 text-[15px]">{email}</p>
      </div>
    </div>
  );
};

export default CompanyAvatar;
