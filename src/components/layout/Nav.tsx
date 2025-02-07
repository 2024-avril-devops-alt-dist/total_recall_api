"use client";

import useDevice from "@/hooks/useDevice";
import { FC } from "react";
import NavBar from "@/components/nav/navbar/NavBar";

interface NavProps {
  user: any;
}

const Nav: FC<NavProps> = ({ user }) => {
  const { isDesktop } = useDevice();
  return isDesktop ? <NavBar user={user} /> : <div>kekw</div>;
};

export default Nav;
