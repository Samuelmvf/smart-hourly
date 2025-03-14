import { ApplicationLogo } from "@/components/application/logo/application-logo";
import ThemeToggle from "@/components/theme-toggle/theme-toogle";
import {  SignedIn, UserButton } from "@clerk/nextjs";

export function ApplicationHeader() {
  return <header className={"w-full flex justify-center items-center h-20 bg-gray-100 dark:bg-gray-800 box-border"}>
    <div className={"container max-w-6xl flex justify-between gap-3 px-4"}>
      <ApplicationLogo/>
      <div className={"flex gap-3"}>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <ThemeToggle/>
      </div>
    </div>
  </header>
}

