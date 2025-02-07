import "@/styles/default.css";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { AccountCompleteModal } from "@/components/auth/AccountCompleteModal";
import Nav from "@/components/layout/Nav";
import { auth } from "@/auth";

export default async function RootLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal?: ReactNode;
}) {
  const session = await auth();

  return (
    <div>
      {session && <AccountCompleteModal />}

      <Nav user={session?.user} />
      {modal}
      {children}
      <Toaster />
    </div>
  );
}
