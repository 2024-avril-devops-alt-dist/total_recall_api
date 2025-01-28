import type { Metadata } from "next";
import AuthProviders from "@/app/AuthProvider";

export const metadata: Metadata = {
  title: "total recall API",
  description: "This is the total recall API for intergalatic travel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProviders>{children}</AuthProviders>
      </body>
    </html>
  );
}
