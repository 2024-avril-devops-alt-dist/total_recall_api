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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
