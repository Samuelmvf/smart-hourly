import type { Metadata } from "next";
import "../globals.css";

import { ApplicationContent } from "@/components/application/content/application-content";
import { ApplicationHeader } from "@/components/application/header/application-header";

export const metadata: Metadata = {
  title: "Dashboard | SmartHourly",
  description: "View your information, statistics, and manage your account.",
  keywords: ["dashboard", "user panel", "SmartHourly", "management"],
  robots: "noindex, nofollow",
};

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ApplicationHeader />

      <ApplicationContent>{children}</ApplicationContent>
    </>
  );
}
