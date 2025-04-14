import ProfileHeader from "@/components/ProfileHeader";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

export default function ProfileLayout(
    {children}:{children:ReactNode}
){
    return(
        <div className="w-screen flex flex-col">
            <ProfileHeader/>
            {children}
            <ToastContainer/>
        </div>
    )
}