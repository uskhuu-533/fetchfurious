import Logo from "@/components/icons/logo";
import { Coffee } from "lucide-react";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-screen h-screen">
      <div className="w-1/2 h-full bg-[#FBBF24] flex items-center justify-center relative">
        <div className="flex gap-3 top-8 left-20 absolute items-center">
          <Coffee size={20} />
          <p className="text-xl font-bold">By me coffee</p>
        </div>
        <div className="flex flex-col gap-10 items-center">
          <Logo />
          <div className="text-lg font-bold">Fund your creative work</div>
          <p className="text-sm w-[445px] text-center">
            Accept support. Start a membership. Setup a shop. It&apos;s easier
            than you think.
          </p>
        </div>
      </div>
      {children}
    </div>
  );
}