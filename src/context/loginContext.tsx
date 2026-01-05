import { create } from "zustand";

export type TypeUser = {
  name: string;
  surname: string;
  phone: string;
};
export type TypeState = {
  users: TypeUser | null;
  login: (user: TypeUser) => void;
  logout: () => void;
};

export const InputCreate = create<TypeState>((set) => ({
  users:null,
  login:(user:TypeUser) => set({users:user}),
  logout:() => set({users:null})
}))