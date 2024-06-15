"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { Company } from "@/models/company";
import CompanyForm from "@/components/form/CompanyForm";
import companySchema from "@/schemas/company";
import useCompanyStore from "@/state-management/company/store";
import Spinner from "@/components/Spinner";

interface Props {
  params: { id: string };
}

interface FetchCompany {
  company: Company;
}

const EditCompanyPage = ({ params: { id } }: Props) => {
  const router = useRouter();
  const { initialise, company } = useCompanyStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      setIsLoading(true);
      const res = await fetch(
        `https://invoicesystm-api.onrender.com/api/companies/${id}`
      );
      const { company }: FetchCompany = await res.json();

      initialise(company);
      setIsLoading(false);
    };

    fetchCompanyDetails();
  }, [id, initialise]);

  const handleSubmit = (values: z.infer<typeof companySchema>) => {
    // api-call
  };
  const handleCancel = () => {
    router.back();
  };

  if (isLoading)
    return (
      <div className="h-full flex justify-center">
        <Spinner />
      </div>
    );

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <p className="text-xl">Edit Your Company</p>
          <hr />
        </div>
        <CompanyForm
          company={company}
          isEditable={true}
          isSending={isSending}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default EditCompanyPage;
