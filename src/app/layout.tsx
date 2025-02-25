import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import { Icons } from "@/components/ui/icons";
import { ProtectedRoutes, PublicRoutes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Sign In | SmartHourly",
  description: "Log in to your account to manage your data and settings.",
  keywords: ["login", "sign in", "authentication", "SmartHourly"],
  robots: "index, follow",
};

const interFont = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider
      signInForceRedirectUrl={ProtectedRoutes.Dashboard}
      afterSignOutUrl={PublicRoutes.SignIn}
      signInUrl={PublicRoutes.SignIn}
      signUpUrl={PublicRoutes.SignUp}
    >
      <html lang="en">
        <body
          className={`${interFont.className} antialiased bg-gray-100 dark:bg-gray-800 text-primary dark:text-white box-border`}
        >
          <ClerkLoading>
            <div className={"w-full h-[100vh] flex justify-center items-center gap-3"}>
              <Icons.Spinner className="size-6 animate-spin" />
              <span>Application is loading...</span>
            </div>
          </ClerkLoading>

          <ClerkLoaded>
            {children}
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
