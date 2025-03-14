import { Providers } from "@/components/providers/providers";
import { Icons } from "@/components/ui/icons";
import { Toaster } from "@/components/ui/sonner";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sign In | SmartHourly",
  description: "Log in to your account to manage your data and settings.",
  keywords: ["login", "sign in", "authentication", "SmartHourly"],
  robots: "index, follow",
};

const interFont = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Providers>
      <html lang='en'>
        <body className={`${interFont.className} antialiased bg-gray-100 dark:bg-gray-800 text-primary dark:text-white box-border`}>
          <ClerkLoading>
            <div className={"w-full h-[100vh] flex justify-center items-center gap-3"}>
              <Icons.Spinner className='size-6 animate-spin' />
              <span>Application is loading...</span>
            </div>
          </ClerkLoading>

          <ClerkLoaded>{children}</ClerkLoaded>
          <Toaster />
        </body>
      </html>
    </Providers>
  );
}
