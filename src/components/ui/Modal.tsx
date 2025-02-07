import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Modal = ({
  title,
  children,
  button,
  open,
  setOpen,
}: {
  title: string;
  children: React.ReactNode;
  button: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{button}</DialogTrigger>
      <DialogContent className="w-11/12 sm:max-w-[425px] overflow-y-scroll no-scrollbar max-h-[85vh] rounded-xl">
        <DialogHeader className="border-b-2 border-stroke pb-6">
          <DialogTitle className="md:text-center text-primary-title text-xl font-title font-bold mt-1 mr-8">
            {title}
          </DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
