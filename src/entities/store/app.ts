import { StateCreator } from 'zustand/index';

import { AppStore } from '@/entities/store/index.ts';
import { UserType } from '@/entities/api/users/types.ts';

export type UserDataType = {
  id: number;
  name: string;
  username: string;
  email: string;
  isAdmin: boolean;
};

type StateType = {
  userData?: UserDataType;
  isLoggedIn: boolean;
  favourites: number[];
  users: UserType[];
};

type ActionsType = {
  setUserData: (userData: UserDataType) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  toggleFavourite: (id: number) => void;
  setUsers: (users: UserType[]) => void;
};

export type AppSliceType = StateType & ActionsType;

export const createAppSlice: StateCreator<
  AppStore,
  [['zustand/devtools', never]],
  [],
  AppSliceType
> = (set) => ({
  userData: undefined,
  setUserData: (userData) => set(() => ({ userData })),
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set(() => ({ isLoggedIn })),
  favourites: [],
  toggleFavourite: (id) =>
    set((state) => {
      if (state.favourites.includes(id)) {
        return {
          favourites: state.favourites.filter((favourite) => favourite !== id),
        };
      }

      return { favourites: [...state.favourites, id] };
    }),
  users: [],
  setUsers: (users) => set(() => ({ users })),
});
