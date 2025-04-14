'use client'
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import SignInForm from "./_features/SignInForm";


export default function Home(){ 
const router = useRouter()
    return(
        <div className="w-1/2 h-full flex items-center justify-center relative">
        <Button onClick={()=>router.push('/sign-up')} className="absolute top-8 right-20 bg-[#F4F4F5] text-black cursor-pointer">
          sign up
        </Button>
        <SignInForm/>
      </div>
    )
}