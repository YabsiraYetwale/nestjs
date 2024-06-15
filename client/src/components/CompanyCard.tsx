"use client";

import React from "react";
import Image from "next/image";
import sampleLogo from "../../public/Titan_Company_Logo.png";
import { Edit, Trash, Trash2 } from "lucide-react";
import { Company } from "@/models/company";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  company: Company;
}

const CompanyCard = ({ company }: Props) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between gap-5 pl-2 pr-4 h-20 w-full bg-gray-100 rounded-lg hover:bg-gray-200 duration-200 cursor-pointer">
      {/* company logo avatar */}
      <div className="flex gap-5">
        <div className="h-16 w-16 rounded-md bg-white">
          <Image alt="company logo" src={sampleLogo} />
        </div>
        {/* company logo avatar */}
        <div className="flex flex-col gap-1 max-w-xs  justify-center">
          <p className="font-medium text-gray-800">{company.name}</p>
          <p className="text-sm text-gray-600">{`${company.city}, ${company.subcity}`}</p>
        </div>
      </div>

      <div className=" flex gap-2  ">
        <button className=" text-red-600 hover:scale-125 duration-200">
          <Trash size={22} />
        </button>
      </div>
    </div>
  );
};

export default CompanyCard;
