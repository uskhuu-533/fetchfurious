"use client";

import { getBankCard } from "@/utils/request";
import { BankCard } from "@prisma/client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type BankCartContex = {
  bankcard: BankCard | undefined;
};
const BankCardContext = createContext<BankCartContex | null>(null);
export const BankCardProvider = ({ children }: { children: ReactNode }) => {
  const [bankcard, setBankCard] = useState<BankCard>();
  const getBank = async () => {
    try {
      const response = await getBankCard()
      if (!response) return
      setBankCard(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBank();
  }, []);  
  return (
    <BankCardContext.Provider value={{ bankcard }}>
      {children}
    </BankCardContext.Provider>
  );
};
export const useBank = () => {
  const context = useContext(BankCardContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
