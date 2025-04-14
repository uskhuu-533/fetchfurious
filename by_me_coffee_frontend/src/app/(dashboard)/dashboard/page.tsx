/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import { useProfile } from "@/provider/ProfileProvider";
import { Copy } from "lucide-react";
import { getDonationWithFilter } from "@/utils/request";
import { useEffect, useState } from "react";
import PageLoading from "@/components/PageLoading";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Donar, { DonationType } from "./_components/Donar";
import SelectDate from "./_components/SelectDate";
import SelectAmount from "./_components/SelectAmount";


export default function Home() {
  const amounts = [1, 3, 5, 10, 15, 20];
  const router = useRouter();
  const [amount, setAmount] = useState<number | null>(null);
  const [donations, setDonation] = useState<DonationType[]>();
  const [totalAmount, setTotalAmount] = useState(0);
  const [dateFilter, setDateFilter] = useState<string | number>(30);
  const { profile, loading, userID } = useProfile();
  const fetchDonation = async () => {
    if (profile) {
      const response = await getDonationWithFilter(
        profile?.userId,
        amount,
        dateFilter
      );
      setDonation(response.data);
      setTotalAmount(response.totalAmount);
    }
  };
  useEffect(() => {
    fetchDonation();
    if (!profile && !loading) {
      router.push("profile");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, dateFilter, loading]);
  const handleSelect = (value: string) => {
    setAmount(Number(value));
  };
  const handleSelectDate = (value: string) => {
    setDateFilter(Number(value));
  };
  if (!profile) {
    return <PageLoading />;
  }
  const copylink = () => {
    const link = `http://localhost:3000/viewpage/${userID}`;
    navigator.clipboard
      .writeText(link)
      .then(() => toast("Successfully copied links"))
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast("Failed to copy the link.");
      });
  };
  return (
    <div className="w-full rounded-xl">
      <div className="flex flex-col  w-full border p-4 m-2 rounded-sm">
        <div className="flex justify-between">
          <div className="flex items-center ">
            <img
              src={profile?.avatarImage ? profile.avatarImage : "/next.svg"}
              className="w-20 h-20 rounded-full"
            />
            <div className="flex flex-col px-2">
              <p>{profile?.name}</p>
              <p>{profile?.socialMediaURL}</p>
            </div>
          </div>
          <div className="flex bg-black text-white rounded-lg w-45 h-13 justify-center items-center">
            <Copy />
            <p className="px-1" onClick={copylink}>
              Share page link
            </p>
          </div>
        </div>
        <hr className="mt-2 " />
        <div className="flex py-4 items-center ">
          <p className="font-bold text-xl px-3">Earnings</p>
         <SelectDate onValueChange={handleSelectDate} defaultValue="last 30 day"/>
        </div>
        <p className="text-3xl mx-2 p-2 font-bold">${totalAmount}</p>
      </div>
      <div className="flex justify-between items-center p-2 m-2 w-full">
        <p className="font-bold">Recent transactions</p>
        <div className="flex items-center px-2 row-reverse  h-8 rounded-sm justify-center">
         <SelectAmount onValueChange={handleSelect} amounts={amounts}/>
        </div>
      </div>
      {donations?.map((donation, index) => (
        <Donar key={index} donation={donation} />
      ))}
    </div>
  );
}
