import { createContext, useState, type ReactNode } from "react";

export type TypeCart = {
  id: number;
  count: number;
};
type CartState = {
  products: TypeCart[];
  addProduct: (id: number, count: number) => void;
  removeProduct: (id: number) => void;
  setProductCount: (id: number, count: number) => void;
};

const contextCart = createContext<CartState | null>(null);

type Props = {
  children: ReactNode;
};

export const CartProvider = ({ children }: Props) => {
  const [products, setProducts] = useState<TypeCart[]>([]);
  const addProduct = (id: number, count: number) => {
    setProducts((x) => x.concat({ id, count }));
  };

  const removeProduct = (id: number) => {
    setProducts((x) => {
      return x.filter((item) => item.id !== id);
    });
  };

  const setProductCount = (id: number, count: number) => {
    setProducts((x) =>
      x.map((element) => {
        if (element.id === id) {
          return { id, count };
        } else {
            return element;
        }
      })
    );
  };
  return (
    <contextCart.Provider value={{ products, addProduct, removeProduct, setProductCount }}>
      {children}
    </contextCart.Provider>
  );
};
