import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

export const metadata: Metadata = {
  title: "Sign Up | SmartHourly",
  description: "Create an account to access all features of SmartHourly.",
  keywords: ["register", "sign up", "create account", "SmartHourly"],
  robots: "index, follow",
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
        {children}
      </body>
    </html>
  );
}
