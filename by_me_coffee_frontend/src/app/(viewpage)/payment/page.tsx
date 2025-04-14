/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { getProfile, sendDonation } from "@/utils/request";
import { useState } from "react";
import { Profile } from "@prisma/client";
import { CheckCircleIcon } from "lucide-react";

export default function PaymentPage() {
  const searchParams = useSearchParams();

  const donorId = searchParams.get("donorid");
  const userId = searchParams.get("userid");
  const message = searchParams.get("speacialmessage") || "";
  const amount = searchParams.get("amount");
const router = useRouter()
  const [succes, setSucces] = useState(false);
  const [profile, setProfile] = useState<Profile>()
  const [loading , setLoading] = useState(false)
  const sendDon = async () => {
    if (message && amount) {
      setLoading(true)
      await sendDonation(
        {
          specialMessage: message,
          amount: Number(amount),
          socialURLOrBuyMeACoffee: "true",
        },
        Number(userId),
        Number(donorId)
      );
      getUser();
      setSucces(true);
    }
  };
  const getUser = async () => {
    if (!userId) return;
    const response = await getProfile(userId);    
    setProfile(response?.data.result);
    setLoading(false)
  };
  return (
    <div className="w-scree h-screen flex items-center justify-center">
      {!succes ? (
        <div className="p-4 flex flex-col gap-8">
          <h1 className="text-xl font-bold">Payment Page</h1>
          <div></div>
          <Button onClick={sendDon}>send donation</Button>
        </div>
      ) : (
        <div className="flex flex-col gap-8 items-center">
          <div className="bg-green-400 h-10 w-10 rounded-full flex items-center justify-center">
            <CheckCircleIcon/>
          </div>
         {!loading &&( <div className="flex flex-col gap-3 border p-6 rounded-lg">
            <div className="flex items-center text-lg ">
              <img className="rounded-full h-8 w-8" src={profile?.avatarImage ? profile.avatarImage : ''} alt="avatar"/>
              <div>{profile?.name}</div>
            </div>
            <div>{profile?.successMessage}</div>
          </div>)}
          <Button onClick={()=>router.push('/explore')}>Return to Explore</Button>
        </div>
      )}
    </div>
  );
}
