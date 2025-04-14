"use client";

import { useState } from "react";
import BankCard from "./_features/BankCard";
import Profile from "./_features/Profile";

export default function Home() {
  const [step, setStep] = useState<"profile" | "bankCard">("profile");


  return (
      <div className="flex w-full items-center h-auto flex-col gap-[24px]">
        {step === "profile" && <Profile setStep={setStep}/>}
        {step === "bankCard" && <BankCard />}
      </div>
  );
}
