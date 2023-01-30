import { create } from "zustand";

interface IUserStore {
  selectedCompanyId: number | null;
  selectCompany: (companyId: number) => void;
}

export const useUserStore = create<IUserStore>((set) => ({
  selectedCompanyId: null,
  selectCompany: (companyId) => set({ selectedCompanyId: companyId }),
}));
