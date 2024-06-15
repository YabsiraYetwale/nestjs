"use client";

import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import companies from "@/data/dummy_companies";
import useCompanyStore from "@/state-management/selected_company/store";

const CompanySelector = () => {
  const { onSelectCompany, selectedCompanyId } = useCompanyStore();
  return (
    <Select
    value={selectedCompanyId}
    onValueChange={(companyId: any) => onSelectCompany(companyId)}
  >
      <SelectTrigger className="w-[130px] focus-visible:ring-zinc-200">
        <SelectValue placeholder="Select a company" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Companies</SelectLabel>
          {companies.map((company) => (
            <SelectItem key={company.id} value={company.id}>
              {company.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CompanySelector;
