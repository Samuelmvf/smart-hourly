import { ApplicationLogo } from "@/components/application/logo/application-logo";
import ThemeToggle from "@/components/theme-toggle/theme-toogle";

export function ApplicationHeader() {
  // TODO: Implement profile actions on header

  return <header className={"w-full flex justify-center items-center h-20 px-4 bg-gray-100 dark:bg-gray-800"}>
    <div className={"container max-w-6xl flex justify-between gap-3 "}>
      <ApplicationLogo/>
      <ThemeToggle/>
    </div>
  </header>
}

