import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";

export default function Email({
  form,
}: {
  form: UseFormReturn<
    {
      email: string;
      password: string;
      username: string;
      about?: string | undefined;
    },
    {
      email: string;
      password: string;
      username: string;
      about?: string | undefined;
    }
  >;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="text-2xl font-bold">
          Welcome, {form.watch("username")}
        </div>
        <div className="text-[#71717A] text-sm">
          Connect email and set a password
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Label>Email</Label>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
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
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <Button
        type="submit"
        variant={
          form.watch("email").length !== 0
            ? form.watch("password").length !== 0
              ? "default"
              : "secondary"
            : "secondary"
        }
      >
        Continue
      </Button>
    </div>
  );
}
