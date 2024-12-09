"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "total recall API",
  description: "This is the total recall API for intergalatic travel.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
