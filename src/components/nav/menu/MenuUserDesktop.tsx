"use client";

import { FC } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/ui/Icons";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

interface MenuUserDesktopProps {
  menu: {
    label: string;
    href: string;
  }[];
}

const MenuUserDesktop: FC<MenuUserDesktopProps> = ({ menu }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="icon" className="p-0">
          <Icons.Menu className="w-8 h-8" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[265px] p-6 mr-6 border-primary rounded-xl">
        {menu.map(({ label, href }) => {
          return (
            <DropdownMenuItem
              key={href}
              asChild
              className="font-title text-lg font-bold text-primary-title"
            >
              <Link href={href}>{label}</Link>
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuItem
          className={cn("cursor-pointer w-full mt-4", buttonVariants())}
          onSelect={(event) => {
            event.preventDefault();
            signOut({
              callbackUrl: `${window.location.origin}/sign-in`,
            });
          }}
        >
          Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuUserDesktop;
