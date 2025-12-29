import { createContext, type ReactNode, type FC, useState, useContext } from "react";

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

const InputContext = createContext<TypeState | null>(null);

type ProvideProps = {
  children: ReactNode;
};
export const CompProvider: FC<ProvideProps> = ({ children }) => {
  const [users, setUser] = useState<TypeUser | null>(null);
  const login = (user: TypeUser) => {
    setUser(user);
  };

  const logout = () => {
      setUser(()=>null);
      console.log(users);
  };
  return (
    <InputContext.Provider value={{ login, logout, users }}>
      {children}
    </InputContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLogin = () => {
  const state = useContext(InputContext);
  if (state === null) {
    console.log("Something went wrong in useContext!");
  } else {
    return state;
  }
}