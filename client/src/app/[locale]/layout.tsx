import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "../../lib/utils";
import SideNavbar from "@/components/SideNavbar";
import Navbar from "@/components/header/Navbar";
import { ReduxProvider } from "@/redux/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

// export default function RootLayout({
//   children
// }: {
//   children: React.ReactNode;
// }
// ) {
  export default function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  return (
    <html lang={locale}>
      <body
        className={cn(
          // "min-h-screen w-full bg-[#111120] text-black flex ",
          "min-h-screen w-full bg-[#fefefe] overflow-x-hidden  text-black flex ",
          inter.className,
          {
            "debug-screens": process.env.NODE_ENV === "development"
          }
        )}
      > 
      <ReduxProvider>
      <div className="flex flex-col">
        <div className="absolute top-3 ">
        <Navbar/>
        </div>
        <div className="mt-[50px] flex flex-col">
        <SideNavbar />
        </div>
        </div>
        <div className="p-8 mt-[50px] w-full">{children}</div>
      </ReduxProvider>
      </body>
    </html>
  );
}

