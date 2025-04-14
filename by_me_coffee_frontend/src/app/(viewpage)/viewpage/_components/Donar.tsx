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
        <div className="w-full flex gap-3">
        <img
          src={
            donation.donor.profile.avatarImage
              ? donation.donor.profile.avatarImage
              : "/next.svg"
          }
          alt="avatar image"
          className="w-8 h-8 rounded-full"
        />
        <div className="flex flex-col gap-3">
          <div className="text-lg flex gap-2">
            <div
              onClick={() =>
                router.push(`/viewpage/${donation.donor.id}`)
              }
              className="font-bold cursor-pointer hover:text-blue-600 hover:underline"
            >
              {" "}
              {donation.donor.profile.name}{" "}
            </div>
            bought ${donation.amount} coffee
          </div>
          {donation.specialMessage && (
            <div>{donation.specialMessage}</div>
          )}
        </div>
      </div>
    )
}
export default Donar