import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type Company = {};

type State = {
  company?: Company;
  company_id?: number;
};

type Actions = {
  setCompany: (company?: Company) => void;
  logout: () => void;
};

export const useCompanyStore = create(
  persist<State & Actions>(
    set => ({
      company: undefined,
      company_id: 15,
      setCompany: company => {
        return set(state => ({
          ...state,
          company,
        }));
      },
      logout: () => {
        return set(() => ({
          company: undefined,
          company_id: 15,
        }));
      },
    }),
    {
      name: 'company',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
