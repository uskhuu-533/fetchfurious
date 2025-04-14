import DashboardHeader from "@/components/DashBoardHeader";
import { ReactNode } from "react";

export default function ProfileLayout(
    {children}:{children:ReactNode}
){
    return(
        <div className="w-screen flex flex-col">
            <DashboardHeader/>
            {children}
        </div>
    )
}