"use client";

import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import UserName from "../_components/UserName";
import Email from "../_components/EmailForm";
import { signUpSchema } from "@/app/api/auth/sign-up/route";
export default function SignUpForm() {
  const router = useRouter();
  const [step, setStep] = useState<"username" | "emailAndPassword">("username");
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const signUp = async (values: z.infer<typeof signUpSchema>) => {
    try {
      await axios.post("api/auth/sign-up", {
        email: values.email,
        password: values.password,
        username: values.username,
      });
      router.push("/sign-in");
    } catch (error) {
      console.log(error);
      form.setError("email", { message: "email already used" });
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(signUp)} className="w-[407px]">
        {step === "username" && <UserName form={form} setStep={setStep} />}
        {step === "emailAndPassword" && <Email form={form} />}
      </form>
    </FormProvider>
  );
}
