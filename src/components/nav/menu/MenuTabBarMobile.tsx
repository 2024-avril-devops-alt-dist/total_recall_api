"use client";

import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/ui/Icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

interface MenuTabBarMobileProps {
  menu: { label: string; href: string }[];
}

const MenuTabBarMobile: FC<MenuTabBarMobileProps> = ({ menu }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "p-0 font-bold text-primary-title font-title text-xs",
            "h-full flex flex-col justify-center items-center focus:outline-none"
          )}
        >
          <Icons.Menu className="w-8 h-8" />
          <span>Menu</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[90vw] mb-6 mr-6 p-6 rounded-xl">
        <DropdownMenuSeparator className="bg-stroke h-px w-full mx-2 my-1" />

        {menu.map(({ label, href }) => {
          return (
            <DropdownMenuItem key={href} asChild>
              <Link
                href={href}
                className="font-title text-sm font-bold text-primary-title"
              >
                {label}
              </Link>
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuItem></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuTabBarMobile;
