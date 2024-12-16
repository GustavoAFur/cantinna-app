/* eslint-disable no-unused-vars */
"use client";
import { ReactNode, createContext, useMemo, useState } from "react";
import { Product } from "../_components/RecomendedList";

export interface BagProduct extends Product {
  quantity: number;
}
interface IBagContext {
  products: BagProduct[];
  totalPrice: number;
  addProductToCart: ({ product }: { product: Product }, qtd: number) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const BagContext = createContext<IBagContext>({
  products: [],
  totalPrice: 0,
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProductFromCart: () => {},
  clearCart: () => {},
});

export const BagProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<BagProduct[]>([]);

  const totalPrice = useMemo(() => {
    return products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  }, [products]);

  const addProductToCart: IBagContext["addProductToCart"] = (
    {
      product,
    }: {
      product: Product;
    },
    qtd: number
  ) => {
    const isProductAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id
    );
    if (isProductAlreadyOnCart) {
      return setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + qtd,
            };
          }
          return cartProduct;
        })
      );
    }
    setProducts((prev) => [...prev, { ...product, quantity: qtd }]); // Inclui a quantidade
  };

  const removeProductFromCart: IBagContext["removeProductFromCart"] = (
    productId: string
  ) => {
    return setProducts((prev) =>
      prev.filter((product) => product.id !== productId)
    );
  };

  const increaseProductQuantity: IBagContext["increaseProductQuantity"] = (
    productId: string
  ) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };
        }
        return cartProduct;
      })
    );
  };

  const decreaseProductQuantity: IBagContext["decreaseProductQuantity"] = (
    productId: string
  ) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          if (cartProduct.quantity === 1) {
            return cartProduct;
          }
          return {
            ...cartProduct,
            quantity: cartProduct.quantity - 1,
          };
        }
        return cartProduct;
      })
    );
  };

  const clearCart = () => {
    return setProducts([]);
  };

  return (
    <BagContext.Provider
      value={{
        products,
        totalPrice,
        addProductToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart,
        clearCart,
      }}
    >
      {children}
    </BagContext.Provider>
  );
};
