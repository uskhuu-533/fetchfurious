"use client";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProfile } from "@/provider/ProfileProvider";
import { profileSchema } from "@/schema/zodSchema";
import { putProfile } from "@/utils/request";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2Icon } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import ImagePreview from "../_components/imagePreview";

export default function ProfileEdit() {
  const { profile } = useProfile();
  const [image, setImage] = useState<File>();
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      avatarImage: profile?.avatarImage ? profile.avatarImage : "",
      name: profile?.name ? profile.name : "",
      about: profile?.about ? profile.about : "",
      socialMediaURL: profile?.socialMediaURL ? profile.socialMediaURL : "",
    },
  });
  const editProfile = async (value: z.infer<typeof profileSchema>) => {
    console.log(value);
    
    try {
      if (!image) return;
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "coffee");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dovchxnto/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Upload failed");
      }
      const result = await response.json();
      const response1 =  await putProfile(value, result.secure_url);
      if (response1) {
        toast(<div className="flex">profile updated <CheckCircle2Icon className="ml-10" /></div>)
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-[510px]">
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-2xl">My account</p>
      </div>
      <div className="flex p-6 flex-col gap-[24px] border rounded-xl ">
        <p className="font-bold text-base">Personal Info</p>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(editProfile)}
            className="flex w-[510px] h-auto flex-col gap-[24px]"
          >
            <FormField
              control={form.control}
              name="avatarImage"
              render={({}) => (
                <ImagePreview setImage={setImage} profile={profile}/>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-[12px]">
                  <Label className="font-medium text-sm">Name</Label>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter name"
                      className="flex px-3 py-4 w-[460px] items-center"
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-[12px]">
                  <Label className="font-medium text-sm">About</Label>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Write about yourself here"
                      className="flex px-3 py-4 w-[460px] items-center"
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="socialMediaURL"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-[12px]">
                  <Label className="font-medium text-sm">
                    Social URL media
                  </Label>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://"
                      className="flex px-3 w-[460px] py-4 items-center"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="flex px-4 py-4 justify-center items-center gap-[8px] w-[460px]"
            >
              Save Changes
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
