"use client";
import { ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "@/provider/UserProvider";

export default function Navigation() {
    const router = useRouter()
    const {goViewPage} = useUser()
  return (
    <div className="sticky mt-[120px] top-[220px] left-[80px] flex flex-col gap-1 w-[300px]">
      <Button className="flex items-cente bg-[#F4F4F5] text-black bg-inherit" onClick={()=>router.push('/dashboard')}>Home</Button>
      <Button className="flex items-cente bg-[#F4F4F5] text-black bg-inherit" onClick={()=>router.push('/explore')}>Explore</Button>
      <Button onClick={goViewPage} className="flex items-cente bg-[#F4F4F5] text-black bg-inherit">
        View page <ExternalLink />
      </Button>
      <Button className="flex items-cente bg-[#F4F4F5] text-black bg-inherit" onClick={()=>router.push('/settings')}>Account settings</Button>
    </div>
  );
}
