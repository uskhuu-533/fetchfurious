import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

export function DialogQr({
  qr,
  open,
  setOpen,
  link
}: {
  qr: string | null;
  open: boolean;
  setOpen: (open: boolean) => void;
  link : string
}) {
  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          type="button"
          className="hidden"
          disabled={!qr}
        >
          Support
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="w-full text-center text-2xl">
            <a href={link}>Scan QR Code</a>
          </DialogTitle>
          <DialogDescription className="text-center">
            Scan the QR code to complete your donation
          </DialogDescription>
          <X
            className="absolute cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </DialogHeader>
        <div className="z-50 w-96 h-96">
          {qr && <div dangerouslySetInnerHTML={{ __html: qr }} />}
        </div>
        <DialogFooter>
          <Button variant="ghost" className="hidden">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
