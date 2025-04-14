/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import PageLoading from "@/components/PageLoading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getManyProfile } from "@/utils/request";
import { Profile } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Explore = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [profiles, setProfiles] = useState<Profile[]>();
  const profileExplore = async () => {
    try {
      const res = await getManyProfile(1, name);
      setProfiles(res.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    profileExplore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);
  if (!profiles) {
    return <PageLoading/>
  }
  return (
    <div className="flex p-24 flex-col gap-[32px] w-full h-fit">
      <div className="flex-col gap-[24px]">
        <div className="flex-col gap-[24px] flex w-full">
          <div className="flex items-center gap-[16px]">
            <p className="font-semibold text-xl">Explore creators</p>
          </div>
          <Input
            className="flex w-[243px] h-fit px-0  items-center gap-[10px] border "
            onChange={(e) => setName(e.target.value)}
            placeholder="Seach name"
          />
          <div className="flex h-fit p-[24px] gap-0 border rounded-[8px] ">
            <div className="flex flex-col gap-4 w-full">
              {profiles.map((profiles: Profile, index) => (
                <div
                  key={index}
                  className="w-full p-6 flex flex-col gap-3 border rounded-xl"
                >
                  <div className="w-full flex justify-between h-fit">
                    <div className="flex gap-4">
                      <img
                        src={profiles.avatarImage ? profiles.avatarImage : ""}
                        className="w-[40px] h-[40px] rounded-full"
                      />
                      <p className="font-semibold text-2xl">{profiles.name}</p>
                    </div>
                    <Button
                      onClick={() =>
                        router.push(`/viewpage/${profiles.userId}`)
                      }
                    >
                      View profile
                    </Button>
                  </div>
                  <div className="h-full flex gap-6">
                    <div className="w-full">
                      <h3 className="font-semibold text-base">
                        About {profiles.name}
                      </h3>
                      <p className="font-normal text-sm mt-[15px]">
                        {profiles.about}
                      </p>
                    </div>
                    <div className="w-full">
                      <h3 className="font-semibold text-base">
                        Social media URL
                      </h3>
                      <p className="font-normal text-sm mt-[15px]">
                        {profiles.socialMediaURL}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Explore;
