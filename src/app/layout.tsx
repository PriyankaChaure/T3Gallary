import "~/styles/globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import TopNav from "./_components/topnav";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: " T3 Gallary",
  description: "Generated by Priyanka",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};




export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="flex flex-col gap-4">
       <TopNav/>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
