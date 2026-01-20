import { create } from "zustand";

export interface Product {
  id: number;
  image:string;
  name: string;
  model: string;
  year: number;
  price: number;
}

export type PostProduct = Omit<Product, "id">;

export interface CartItem extends Product {
  quantity: number;
}
export interface ContextType {
  products: Product[];
  cart: CartItem[] | [];
  isError:string;
  loading: boolean;
  addToCart: (product: Product) => void;
  minusCart: (product: CartItem) => void;
  removeCart: (id: number) => void;
  postCar:(car:PostProduct) => Promise<void>;
}

export const apiCreateEffect = create<ContextType>((set) => {
const post = async (car:PostProduct) => {
  const url = "http://192.168.30.17:3001/cars";
  try {
    set({loading:true});
    await fetch(url, {
      method:"post",
      body:JSON.stringify(car)
  });
  } catch (error:unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        set({isError:error.message});
      }
    } finally {
      setTimeout(() => {
        set({loading:false})
      }, 1600);
    }
};


  const main = async () => {
    try {
      set({ loading: true });
      const res = await fetch("http://192.168.30.17:3001/cars");
      const data: Product[] = await res.json();
      set({ products: data });
    } catch (error:unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        set({isError:error.message});
      }
    } finally {
      setTimeout(() => {
        set({loading:false})
      }, 1600);
    }
  };
  main();

  return {
    products: [],
    cart: [],
    isError:"",
    loading: false,
    postCar:async (car:PostProduct) => {
      await post(car);
       main();
    },
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
