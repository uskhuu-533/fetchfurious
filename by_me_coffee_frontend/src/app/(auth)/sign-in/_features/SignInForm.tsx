"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProfile } from "@/provider/ProfileProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
export default function SignInForm() {
  const router = useRouter();
  const { setUser } = useProfile();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signIn = async (values: z.infer<typeof signInSchema>) => {
    try {
      const response = await axios.post("/api/auth/sign-in", {
        email: values.email,
        password: values.password,
      });
      localStorage.setItem("token", response.data.token);
      setUser(true);
      router.push("/dashboard");
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;      
      const errorMessage = err.response?.data.error;
      if (errorMessage == "user not found") {
        form.setError("email", { message: errorMessage });
      } else if (errorMessage === "wrong password or email") {
        form.setError("password", { message: errorMessage });
      }else {
        console.error("Sign-in error:", errorMessage || err.message);
      }
    }
  };
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(signIn)}
        className="w-[407px] flex flex-col gap-6"
      >
        <div className="text-2xl bold">Welcome Back</div>
        <div className="flex flex-col gap-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label>Email</Label>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <Label>Password</Label>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Continue</Button>
      </form>
    </FormProvider>
  );
}
