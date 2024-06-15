import React, { Suspense } from "react";
import CompanyAvatar from "./CompanyAvatar";
import CompanyAbout from "./CompanyAbout";
import CompanyInfoIcons from "./CompanyInfoIcons";
import { Company } from "@/models/company";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CompanyDocuments from "./CompanyDocuments";

interface Props {
  params: { id: string };
}

interface FetchCompany {
  company: Company;
}

const CompanyPage = async ({ params: { id } }: Props) => {
  const res = await fetch(
    `https://invoicesystm-api.onrender.com/api/companies/${id}`
  );
  const { company }: FetchCompany = await res.json();

  return (
    <div className="flex flex-col">
      <div className="w-full h-40 bg-zinc-200"></div>
      <Suspense fallback={<Spinner />}>
        <div className=" w-full flex flex-col px-10">
          <div className="flex justify-between">
            <CompanyAvatar company={company} />
            <Link href={`${id}/edit`}>
              <Button className="mt-4 bg-blue-500 hover:bg-blue-600">
                Edit
              </Button>
            </Link>
          </div>

          <hr />
          <div className="w-full grid grid-cols-1 gap-10 xl:gap-0 xl:grid-cols-[850px_300px] justify-around mt-10">
            <CompanyAbout company={company} />
            <CompanyInfoIcons company={company} />
            <div className=" col-span-full">
              <CompanyDocuments />
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default CompanyPage;
