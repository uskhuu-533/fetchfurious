/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'

import { Profile } from "@prisma/client";
import { useRouter } from "next/navigation";

export type DonationType = {
  donor: { id: number; profile: Profile };
  amount: number;
  createdAt: Date;
  recipientId: null;
  socialURLOrBuyMeACoffee: string;
  specialMessage: string;
  displayTime : string
};
const Donar = ({donation}:{donation : DonationType}) => {
    const router = useRouter()
    return (
        <div className=" border p-5 w-full rounded-sm">
        <div className="flex items-center  justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full">
            <img
              className="rounded-full w-full h-full bg-gray-200 text-center flex items-center justify-center"
              src={
                donation.donor.profile.avatarImage
                  ? donation.donor.profile.avatarImage
                  : ""
              }
            /></div>
            <div className=" px-2">
              <div className="flex gap-2">Guest
                <div onClick={()=>router.push(`/viewpage/${donation.donor.id}`)} className="font-bold cursor-pointer hover:underline"> {donation.donor.profile.name}</div>
              </div>
              <p className="cursor-pointer hover:underline text-sm">{donation.socialURLOrBuyMeACoffee}</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="font-bold">
              + <span>${donation.amount}</span>
            </p>
            <p className="text-sm">{donation.displayTime}</p>
          </div>
        </div>
        <p className="p-2">{donation.specialMessage}</p>
      </div>
    )
}
export default Donar