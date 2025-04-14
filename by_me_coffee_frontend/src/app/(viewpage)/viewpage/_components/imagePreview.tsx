/* eslint-disable @next/next/no-img-element */
'use client'
import { FormControl, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Profile } from "@prisma/client"
import { Camera } from "lucide-react"
import { useState } from "react"

const ImagePreview = ({profile, setImage}: {setImage : (image : File)=> void, profile : Profile | null}) => {
      const [preview, setPreview] = useState<string | undefined | null>(
        profile?.avatarImage
      );
    const generatePreview = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.type === "file" && e.target.files) {
          const file = e.target.files[0];
          const objecturl = URL.createObjectURL(file);
          setPreview(objecturl);
          setImage(file);
        }
      };
    return (
        <FormItem className="flex flex-col gap-[12px]">
        <Label>
          Add photo
          <div className="flex w-[160px] h-[160px] justify-center items-center bg-[#E4E4E7] border-dashed border rounded-full">
            {preview ? (
              <img
                src={preview}
                alt="Profile preview"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <Camera type="file" />
            )}
          </div>
          <FormControl>
            <Input
              className="hidden"
              type="file"
              onChange={generatePreview}
            />
          </FormControl>
        </Label>
      </FormItem>
    )
}
export default ImagePreview