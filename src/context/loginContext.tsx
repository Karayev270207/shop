import { create } from "zustand";

export type TypeUser = {
  name: string;
  surname: string;
  phone: string;
};
export type TypeState = {
  loading:boolean;
  users: TypeUser | null;
  login: (user: TypeUser) => void;
  logout: () => void;
  saveUser:() => void;
};

export const InputCreate = create<TypeState>((set) => ({
  loading:false,
  users:null,
  login:(user:TypeUser) => {set({loading:true,users:user}); localStorage.setItem("user", JSON.stringify({user}));setTimeout(() => {
    set({loading:false});
  },1600)},
  logout:() => {set({users:null}); localStorage.removeItem("user")},
  saveUser:() => { const saved = JSON.parse(localStorage.getItem("user")!)
    set({
    users: saved
  })}
}))