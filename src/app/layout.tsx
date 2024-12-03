import type { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}
