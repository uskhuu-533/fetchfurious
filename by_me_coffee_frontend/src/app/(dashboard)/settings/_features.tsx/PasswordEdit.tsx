import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { passwordSchema } from "@/schema/zodSchema";
import { putUser } from "@/utils/request";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2Icon } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function PasswordEditForm() {
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const updatedUser = async (value: z.infer<typeof passwordSchema>) => {
    try {
      const res = await putUser(value);
      if (res) {
        toast(<div className="flex">password changed <CheckCircle2Icon className="ml-5" stroke="green"/></div>)
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(updatedUser)}>
        <div className="flex p-6 flex-col gap-[24px] border rounded-xl mt-[20px]">
          <p className="font-bold text-base">Set a new password</p>
          <div className="flex flex-col gap-[12px]">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-[8px]">
                  <Label className="font-semibold text-sm">New password</Label>
                  <FormControl>
                    <Input
                      {...field}
                      className="flex h-[40px] px-3 py-4 items-center "
                      placeholder="Enter new password"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-[8px]">
                  <Label className="font-semibold text-sm">
                    Confirm password
                  </Label>
                  <FormControl>
                  <Input
                    {...field}
                    className="flex h-[40px] px-3 py-4 items-center "
                    placeholder="Enter new password"
                  />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            className="flex h-[40px] px-4 py-4 items-center justify-center gap-[8px]"
            type="submit"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
