import { create } from "zustand";

interface CompanyStore {
  selectedCompanyId: string;
  onSelectCompany: (companyId: string) => void;
}

const useCompanyStore = create<CompanyStore>((set) => ({
  selectedCompanyId: "",
  onSelectCompany: (companyId) =>
    set((store) => ({
      selectedCompanyId: companyId,
    })),
}));

export default useCompanyStore;
