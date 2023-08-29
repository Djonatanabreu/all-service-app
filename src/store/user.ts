import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from 'interfaces/user.interface';
import { ICategoryProps } from 'screens/Dashboard/BuscarProfissionais';
import { Cidade } from 'screens/Dashboard/Cidades';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type State = {
  user?: User;
  cidade?: Cidade;
  category?: ICategoryProps;
};

type Actions = {
  setUser: (user?: User) => void;
  setCidade: (cidade?: Cidade) => void;
  setCategories: (categoria?: ICategoryProps) => void;
  logout: () => void;
};

export const useUserStore = create(
  persist<State & Actions>(
    set => ({
      user: undefined,
      cidade: undefined,
      setUser: user => {
        return set(state => ({
          ...state,
          user,
        }));
      },
      setCidade: cidade => {
        return set(state => ({
          ...state,
          cidade,
        }));
      },
      setCategories: category => {
        return set(state => ({
          ...state,
          category,
        }));
      },
      logout: () => {
        return set(() => ({
          user: undefined,
          cidade: undefined,
        }));
      },
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
