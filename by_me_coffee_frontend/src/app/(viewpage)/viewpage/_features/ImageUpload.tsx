"use client";

import { Button } from "@/components/ui/button";
import { useProfile } from "@/provider/ProfileProvider";
import { CameraIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const ImageUpload = ({onClose}: {onClose? : ()=>void}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [image, setImage ]= useState<File>()
  const generatePreview = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "file" && e.target.files) {
      const file = e.target.files[0];
      const objecturl = URL.createObjectURL(file);
      setPreview(objecturl);
      setImage(file)
    }
  };

  const { addBackgroundImage } = useProfile();
  const ProfileImage = async () => {
      try {
        if (!image) return
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
        await addBackgroundImage(result.secure_url);
        setPreview(null)
        setImage(undefined)
        if (onClose) onClose(); 
      } catch (error) {
        console.error(error);
      }
    }
  return (
    <>
      {!preview ? (
        <div className="w-full h-full flex justify-center items-center bg-[#F4F4F5]">
          <label className="flex items-center cursor-pointer bg-[#18181B] px-4 py-2 rounded-lg gap-2 text-[#FAFAFA]">
            <CameraIcon />
            Add cover image
            <input type="file" onChange={generatePreview} className="hidden" />
          </label>
        </div>
      ) : (
        <div className="w-full h-full overflow-hidden relative flex items-center">
          <Image
            className="w-full h-auto"
            alt="background"
            width={1000}
            height={100}
            src={preview}
          />
          <div className="absolute top-5 right-10">
            <Button onClick={ProfileImage}>Save saveChanges</Button>
            <Button variant='secondary' onClick={() => { setPreview(null); onClose?.(); }}>Cancel</Button>
          </div>
        </div>
      )}
    </>
  );
};
export default ImageUpload;
