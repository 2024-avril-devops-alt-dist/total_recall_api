"use client";

import useDevice from "@/hooks/useDevice";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  const { isDesktop } = useDevice();

  if (isDesktop) return null;

  return (
    <Link href="/">
      <Image
        src="/logo.svg"
        alt="logo"
        width={200}
        height={80}
        priority
        className="cursor-pointer mt-4 mb-9 mx-auto object-contain"
      />
    </Link>
  );
};

export default Logo;
