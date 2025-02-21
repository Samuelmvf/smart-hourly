import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import { ApplicationHeader } from "@/components/application/header/application-header";
import { ApplicationContent } from "@/components/application/content/application-content";

export const metadata: Metadata = {
  title: "Dashboard | SmartHourly",
  description: "View your information, statistics, and manage your account.",
  keywords: ["dashboard", "user panel", "SmartHourly", "management"],
  robots: "noindex, nofollow",
};

const interFont = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interFont.className} font-bold antialiased bg-gray-100 dark:bg-gray-800 text-primary dark:text-white box-border`}
      >
          <ApplicationHeader />
          <ApplicationContent>
            {children}
          </ApplicationContent>
      </body>
    </html>
  );
}
