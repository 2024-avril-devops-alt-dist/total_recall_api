import "@/styles/default.css";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
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
      <Nav user={session?.user} />
      {modal}
      {children}
      <Toaster />
    </div>
  );
}
