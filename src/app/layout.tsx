import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { BagProvider } from "./_context/bagContext";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Cantinna",
  description: "App de delivery do cantinna",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <BagProvider>{children}</BagProvider>
      </body>
    </html>
  );
}
