import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MyTasks",
  description: "A task board system for professionals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"antialiased min-h-screen"}>{children}</body>
    </html>
  );
}
