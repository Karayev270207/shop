import { useEffect } from "react";
import { create } from "zustand";

export interface Product {
  id: number;
  name: string;
  model: string;
  year: string;
  price: number;
}
export interface CartItem extends Product {
  quantity: number;
}
export interface ContextType {
  products: Product[] | [];
  cart: CartItem[] | [];
  loading: boolean;
  addToCart: (product: Product) => void;
  minusCart: (product: CartItem) => void;
  removeCart: (id: number) => void;
}

export const apiCreateEffect = create<ContextType>((set) => {
  const main = async () => {
    try {
      set({ loading: true });
      const res = await fetch("http://localhost:3000/cars");
      const data: Product[] = await res.json();
      set({ products: data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  };
  main();
  
  return {
    products: [],
    cart: [],
    loading: false,
    addToCart: (product: Product) => {
      set((state) => {
        const prev = state.cart;
        const exist = prev.find((item) => item.id === product.id);
        if (exist) {
          return {
            cart: prev.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        } else {
          return { cart: [...prev, { ...product, quantity: 1 }] };
        }
      });
    },
    minusCart: (product: CartItem) => {
      set((state) => ({
        cart: state.cart.map((item) =>
          item.id === product.id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      }));
    },
    removeCart: (id: number) => {
      set((state) => ({
        cart: state.cart.filter((f) => f.id !== id),
      }));
    },
  };
});
