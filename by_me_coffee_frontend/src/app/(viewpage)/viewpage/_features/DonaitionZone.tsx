import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProfile } from "@/provider/ProfileProvider";
import { getQr } from "@/utils/request";
import { zodResolver } from "@hookform/resolvers/zod";
import { Profile } from "@prisma/client";
import { Coffee } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { DialogQr } from "./QrDialog";
export const donationSchema = z.object({
  socialURLOrBuyMeACoffee: z.string().min(1, "please enter your social URL"),
  specialMessage: z.string().optional(),
  amount: z.number(),
});
const DonationZone = ({
  profiles,
  getRecivedDonnation,
}: {
  profiles: Profile;
  getRecivedDonnation: () => void;
}) => {
  const { profile } = useProfile();
  const [open, setOpen] = useState(false)
  const [qr, setqr] = useState<string | null>(null);
  const [link, setLink] = useState('')
  const amounts = [1, 2, 3, 5, 10, 15];
  const form = useForm<z.infer<typeof donationSchema>>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: 0,
      socialURLOrBuyMeACoffee: profile?.socialMediaURL
        ? profile.socialMediaURL
        : "",
      specialMessage: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof donationSchema>) => {
    if (profile?.userId === profiles.userId) {
      return;
    }
    if (data.amount === 0) {
      return;
    }
    try {
      const response = await getQr(data, profiles.userId);
      setOpen(true)
      setqr(response?.data.data);
      setLink(response?.data.link)
      getRecivedDonnation();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FormProvider {...form}>
      <DialogQr qr={qr} open={open} setOpen={setOpen} link={link}/>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-fit flex-col gap-8 w-full border rounded-lg bg-[#FFFFFF] p-6"
      >
        <div className="flex flex-col gap-6">
          <div className="text-2xl font-semibold">
            Buy {profiles?.name} a Coffee
          </div>
          <div className="flex flex-col gap-2">
            <p>Select amount</p>
            <FormField
              control={form.control}
              name="amount"
              render={() => (
                <div className="flex gap-2">
                  {amounts.map((amount, index) => (
                    <Button
                      type="button"
                      onClick={() => form.setValue("amount", amount)}
                      variant="secondary"
                      key={index}
                      className={`flex py-2 px-4 text-[14px] ${
                        form.getValues("amount") === amount &&
                        "border-[#18181B] border-2"
                      } `}
                    >
                      <Coffee />${amount}
                    </Button>
                  ))}
                </div>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="socialURLOrBuyMeACoffee"
          render={({ field }) => (
            <FormItem>
              <Label>Enter BuyMeCoffee or social acount URL:</Label>
              <FormControl>
                <Input
                  {...field}
                  className="py-2 px-3"
                  placeholder="buymeacoffee.com/"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="specialMessage"
          render={({ field }) => (
            <FormItem>
              <Label>Special message:</Label>
              <FormControl>
                <Textarea
                  {...field}
                  className="py-2 px-3 h-[130px] resize-none"
                  placeholder="Please write your message here"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Support</Button>
      </form>
    </FormProvider>
  );
};
export default DonationZone;
