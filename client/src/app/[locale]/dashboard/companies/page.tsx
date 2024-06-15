import CompanyCard from "@/components/CompanyCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Company } from "@/models/company";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

interface FetchCompanies {
  companies: Company[];
}

const skeletons = [1, 2, 3, 4, 5, 6];

const CompaniesPage = async () => {
  const res = await fetch(
    "http://localhost:3001/api/companies",
    { cache: "no-cache" }
  );
  const { companies: companies }: FetchCompanies = await res.json();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <p className="text-xl">Your Companies</p>
          <Link href="companies/new">
            <button className="flex items-center gap-1 px-1 h-10 w-24 justify-center bg-zinc-200 rounded-lg hover:bg-zinc-300">
              Add <Plus />{" "}
            </button>
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
    </div>
  );
};

export default CompaniesPage;
