"use client";
import React from "react";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import SignUpForm from "./_features/SignUpForm";
export default function Home() {
  const router = useRouter();
  return (
    <div className="w-1/2 h-full flex items-center justify-center relative">
      <Button
        onClick={() => router.push("/sign-in")}
        className="absolute top-8 right-20 bg-[#F4F4F5] text-black cursor-pointer"
      >
        sign in
      </Button>
      <SignUpForm />
    </div>
  );
}
