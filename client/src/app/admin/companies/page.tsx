import CompanyCard from "@/components/CompanyCard";
import PageTitle from "@/components/PageTitle";
import { Skeleton } from "@/components/ui/skeleton";
import { Company } from "@/models/company";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { Suspense } from "react";

interface FetchCompanies {
  allCompanies: Company[];
}

const skeletons = [1, 2, 3, 4, 5, 6];

const CompaniesPage = async () => {
  const res = await fetch(
    "https://invoicesystm-api.onrender.com/api/companies",
    { cache: "no-cache" }
  );
  const { allCompanies: companies }: FetchCompanies = await res.json();

  return (
    <div className="flex justify-evenly">
      <div className="flex flex-col gap-5  w-full">
        <div className="w-full 2xl:w-3/4 self-center flex flex-col gap-y-10 justify-between">
          <div className="flex w-full flex-col gap-1">
            <div className="flex justify-between items-center">
              <PageTitle title="Companies" />
              <Link href="companies/new">
                <Button className="bg-blue-600 hover:bg-blue-500 w-[100px] h-[35px] ">
                  Add New
                </Button>
              </Link>
            </div>
            <hr />
          </div>
          <Suspense
            fallback={
              <div className="w-full flex flex-col gap-2">
                {skeletons.map((skeleton) => (
                  <Skeleton key={skeleton} className="h-20" />
                ))}
              </div>
            }
          >
            <div className="flex flex-col gap-2 2xl:px-24">
              {companies.map((company) => (
                <Link href={`companies/${company.id}`} key={company.id}>
                  <CompanyCard company={company} key={company.id} />
                </Link>
              ))}
            </div>
          </Suspense>
          {companies.length == 0 && (
            <p className="text-center">No companies found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompaniesPage;
