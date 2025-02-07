"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SafeUser } from "@/types/user";
import { Button } from "@/components/ui/button";
import MenuUserDesktop from "@/components/nav/menu/MenuUserDesktop";
import { getNavBarMenu, getNavbar } from "@/constants/nav";
import Image from "next/image";

interface NavbarProps {
  user?: SafeUser | null;
}

export default function NavBar({ user }: NavbarProps) {
  const [blurBackground, setBlurBackground] = useState(false);
  const [highlightBackground, setHighlightBackground] = useState(false);

  const { scrollY } = useScroll();
  const screenHeight = typeof window !== "undefined" ? window.innerHeight : 0;

  useMotionValueEvent(scrollY, "change", (latest) => {
    setBlurBackground(latest > 0);
    setHighlightBackground(latest > screenHeight - 200);
  });

  let pathname = usePathname() || "/";

  const [hoveredPath, setHoveredPath] = useState(pathname);

  const role = user?.role ?? null;
  const NAVITEMS = getNavbar(role);
  const MENU = getNavBarMenu(role);

  return (
    <motion.div
      className={cn(
        "sticky top-0 left-0 right-0  py-3 px-8 z-30 bg-transparent",
        "rounded-lg border border-transparent",
        {
          "backdrop-blur-sm": blurBackground,
          "bg-background": highlightBackground,
          "border-secondary": blurBackground,
        }
      )}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: 1,
      }}
    >
      <div className="max-w-[1480px] mx-auto flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo.svg"
            priority
            width={165}
            height={66}
            alt="logo de Kit le nid: devenir propriétaire"
          />
        </Link>
        <div className="flex items-center justify-end flex-1">
          <nav>
            <ul className="flex gap-2 relative justify-start w-full z-[100]  rounded-lg">
              {NAVITEMS.map(({ label, href }) => {
                const isActive = href === pathname;

                return (
                  <li key={href} className="mr-10">
                    <Link
                      className={cn(
                        "relative duration-300 ease-in pb-2.5",
                        "font-bold text-primary-title font-title text-2xl no-underline hover:text-primary",
                        {
                          "text-primary-foreground": isActive,
                        }
                      )}
                      data-active={isActive}
                      href={href}
                      onMouseOver={() => setHoveredPath(href)}
                      onMouseLeave={() => setHoveredPath(pathname)}
                    >
                      <span>{label}</span>
                      {href === hoveredPath && (
                        <motion.div
                          className={cn(
                            "absolute bottom-0 left-0 right-0 h-[3px] w-5/12 mx-auto bg-primary rounded-md -z-10",
                            {
                              "bg-primary-foreground": isActive,
                            }
                          )}
                          layoutId="navbar"
                          aria-hidden="true"
                          transition={{
                            type: "spring",
                            bounce: 0.25,
                            stiffness: 130,
                            damping: 9,
                            duration: 0.3,
                          }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {user ? (
            <MenuUserDesktop menu={MENU} />
          ) : (
            <Button asChild className="whitespace-nowrap">
              <Link href="/sign-in">Connexion / Inscription</Link>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
