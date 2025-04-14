import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { putSuccess, successMessageSchema } from "@/utils/request";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { toast } from "sonner";
import { CheckCircle2Icon } from "lucide-react";
export default function SuccessEdit() {
  const form = useForm<z.infer<typeof successMessageSchema>>({
    resolver: zodResolver(successMessageSchema),
    defaultValues: {
      successMessage: "",
    },
  });
  const updatedSucess = async (value: z.infer<typeof successMessageSchema>) => {
    try {
      const res = await putSuccess(value);
      if (res) {
        toast(
          <div className="flex">
            succes message changed <CheckCircle2Icon className="ml-10" stroke="green"/>
          </div>
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(updatedSucess)}>
        <div className="flex p-6 flex-col gap-[24px] border rounded-xl mt-[20px]">
          <p className="font-bold text-base">Success page</p>
          <FormField
            control={form.control}
            name="successMessage"
            render={({ field }) => (
              <div className="flex flex-col gap-[12px]">
                <FormItem className="flex flex-col gap-[8px]">
                  <Label className="font-semibold text-sm">
                    Confirmation message
                  </Label>
                  <FormControl>
                    <Input
                      {...field}
                      className="flex h-[40px] px-3 py-10 items-center "
                      placeholder="Enter message"
                    />
                  </FormControl>
                </FormItem>
              </div>
            )}
          />
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
