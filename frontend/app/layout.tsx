import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Avatar from "@/components/Avatar";
import {SessionProvider} from "next-auth/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className={"p-4 border-gray-300"}>
          {/*<SessionProvider refetchInterval={5}>*/}
          <Avatar />
          {/*</SessionProvider>*/}

        </div>
        {children}
      </body>
    </html>
  );
}
