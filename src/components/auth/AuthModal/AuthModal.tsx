"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AuthModal {
  title: string;
  isOpen?: boolean;
  buttonName?: string;
  onToggle?: () => void;
  children: React.ReactNode;
}

const AuthModal: React.FC<AuthModal> = ({
  title,
  buttonName,
  isOpen = false,
  onToggle,
  children,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onToggle}>
      {buttonName && (
        <DialogTrigger aria-controls="radix-:R1mcq:" asChild className="none">
          <Button>{buttonName}</Button>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-4 pb-4 border-b-2 text-center text-primary-title font-title font-bold text-lg">
            {title}
          </DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
