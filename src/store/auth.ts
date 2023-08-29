import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from 'services/api';

type State = {
  token?: string;
  signed: boolean;
};

type Actions = {
  setToken: (token: string) => void;
  logout: () => void;
};

export const getToken = () => {
  return useAuthStore.getState().token;
};

export const useAuthStore = create(
  persist<State & Actions>(
    set => ({
      token: undefined,
      signed: false,
      setToken: (token: string) => {
        api.defaults.headers.common['x-access-token'] = `Bearer ${token}`;
        return set(() => ({
          token,
          signed: true,
        }));
      },
      logout: () => {
        delete api.defaults.headers.common['x-access-token'];
        return set(() => ({
          token: undefined,
          signed: false,
        }));
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
