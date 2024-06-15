import React from "react";
import {
  Mail,
  MapPin,
  PhoneCall,
  Printer,
  Refrigerator,
  SquareActivity,
  User,
} from "lucide-react";
import { Company } from "@/models/company";

interface Props {
  company: Company;
}

const CompanyInfoIcons = ({company}: Props) => {
  return (
    <div className="h-84 border-zinc-100 border-2 rounded-lg py-3 px-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:flex xl:flex-col gap-y-10 gap-x-5 xl:gap-3 xl:justify-center">
      <div className="flex gap-2">
        <div className="bg-gray-100 rounded-md flex w-10 items-center justify-center">
          <Mail className="text-gray-400" />
        </div>
        <div className="flex flex-col text-[13px]">
          <p className="font-semibold tracking-wider text-gray-700 line-clamp-1">
            {company?.email}
          </p>
          <p className="text-gray-400">Email</p>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="bg-gray-100 rounded-md flex w-10 items-center justify-center">
          <PhoneCall className="text-gray-400" />
        </div>
        <div className="flex flex-col text-[13px]">
          <p className="font-semibold tracking-wider text-gray-700 line-clamp-1">
            {company?.tel1}
          </p>
          <p className="text-gray-400">Telephone</p>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="bg-gray-100 rounded-md flex w-10 items-center justify-center">
          <User className="text-gray-400" />
        </div>
        <div className="flex flex-col text-[13px]">
          <p className="font-semibold tracking-wider text-gray-700 line-clamp-1">
            {company?.general_manager_name}
          </p>
          <p className="text-gray-400">General Manager</p>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="bg-gray-100 rounded-md flex w-10 items-center justify-center">
          <MapPin className="text-gray-400" />
        </div>
        <div className="flex flex-col text-[13px]">
          <p className="font-semibold tracking-wider text-gray-700 line-clamp-1">
            {`${company?.subcity}, ${company?.city}`}
          </p>
          <p className="text-gray-400">Location</p>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="bg-gray-100 rounded-md flex w-10 items-center justify-center">
          <Printer className="text-gray-400" />
        </div>
        <div className="flex flex-col text-[13px]">
          <p className="font-semibold tracking-wider text-gray-700 line-clamp-1">
            {company?.fax}
          </p>
          <p className="text-gray-400">Fax</p>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="bg-gray-100 rounded-md flex w-10 items-center justify-center">
          <SquareActivity className="text-gray-400" />
        </div>
        <div className="flex flex-col text-[13px]">
          <p className="font-semibold tracking-wider text-gray-700 line-clamp-1">
            {company?.tin_number}
          </p>
          <p className="text-gray-400">TIN</p>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="bg-gray-100 rounded-md flex w-10 items-center justify-center">
          <Refrigerator className="text-gray-400" />
        </div>
        <div className="flex flex-col text-[13px]">
          <p className="font-semibold tracking-wider text-gray-700 line-clamp-1">
            {company?.vat_reg_number}
          </p>
          <p className="text-gray-400">VAT </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfoIcons;
