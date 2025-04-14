"use client";

import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";
type UserContextType = {
  goViewPage: () => void;
};
const UserContext = createContext<UserContextType | null>(null);
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const goViewPage = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const decode = jwtDecode<JwtPayload>(token);
    router.push(`/viewpage/${decode.userId}`);
  };

  return (
    <UserContext.Provider value={{ goViewPage }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
