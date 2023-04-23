import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";

interface IShopProviderProps {
  children: React.ReactNode;
}

interface IShopContext {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  productList: IProduct[];
  cartProductList: IProduct[];
  setCartProductList: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

export const ShopContext = createContext({} as IShopContext);

export const ShopProvider = ({ children }: IShopProviderProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [productList, setProductList] = useState<IProduct[]>([]);
  const [cartProductList, setCartProductList] = useState<IProduct[]>([]);

  useEffect(() => {
    localStorage.setItem(
      "@hamburgueria:CARTLIST",
      JSON.stringify(cartProductList)
    );
  });

  useEffect(() => {
    const loadProductList = async () => {
      const token = localStorage.getItem("@hamburgueria:TOKEN");
      try {
        const { data } = await api.get<IProduct[]>(`/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProductList(data);
      } catch (error) {
        toast.error("Token inválido");
      }
    };
    loadProductList();
  }, []);

  return (
    <ShopContext.Provider
      value={{
        modalOpen,
        setModalOpen,
        productList,
        cartProductList,
        setCartProductList,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
