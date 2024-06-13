import { Company } from "@/models/company";
import { create } from "zustand";

interface CompanyStore {
  company: Company;
  initialise: (company: Company) => void;
}

const useCompanyStore = create<CompanyStore>((set) => ({
  company: {
    id: "",
    name: "",
    logo_url: "",
    general_manager_name: "",
    company_number: "",
    tin_number: "",
    house_number: "",
    po_box: "",
    vat_reg_number: "",
    fax: "",
    email: "",
    tel1: "",
    tel2: "",
    country: "",
    region: "",
    city: "",
    subcity: "",
    woreda: "",
    kebele: "",
    users: [],
    documents: [],
  },
  initialise: (company) =>
    set((store) => ({
      company: company,
    })),
}));

export default useCompanyStore;
