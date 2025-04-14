"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";
import { addBackground, getUserProfile } from "@/utils/request";

import { Profile } from "@prisma/client";
import { toast } from "sonner";

type ProfileContext = {
  profile: Profile | null;
  addBackgroundImage : (image:string)=>void
  userID : string
  loading :boolean
  setUser : (user : boolean) => void
  setProfile : (profile : Profile | null) => void
};
const ProfileContex = createContext<ProfileContext | null>(null);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userID, setUserID] = useState("");
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await getUserProfile();
      if (!response?.data.result) {
        return;
      }
      setProfile(response.data.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const getUserID = () =>{
    const token = localStorage.getItem("token");
    if (!token) return;
    const decode = jwtDecode<JwtPayload>(token);
    console.log(decode.userId);
    setUserID(decode.userId);
  }
  useEffect(() => {
    fetchProfile();
    getUserID()
  }, [user]);
  const addBackgroundImage = async (image: string) => {
    try {
      setLoading(true);
      await addBackground(image, userID);
      fetchProfile()
      toast('background chaged')
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ProfileContex.Provider value={{ profile, addBackgroundImage, userID, loading , setUser, setProfile}}>
      {children}
    </ProfileContex.Provider>
  );
};
export const useProfile = () => {
  const context = useContext(ProfileContex);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
