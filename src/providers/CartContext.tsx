import { createContext, useState } from "react";

interface ICartProviderProps {
  children: React.ReactNode;
}

interface ICartContext {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CartContext = createContext({} as ICartContext);

export const CartProvider = ({ children }: ICartProviderProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <CartContext.Provider
      value={{
        modalOpen,
        setModalOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
