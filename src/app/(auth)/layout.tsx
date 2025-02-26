import ThemeToggle from "@/components/theme-toggle/theme-toogle";
import { Oswald } from "next/font/google";
import "../globals.css";

const oswaldFont = Oswald({
  subsets: ["latin"],
});

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-[40%_60%] w-full h-[100vh] grow items-center sm:justify-center'>
        <div
          className={`${oswaldFont.className} w-full h-[100vh] bg-yellow-500 hidden md:flex flex-col items-center justify-center px-4`}
        >
          <div className={"flex items-center gap-3"}>
            <div className={"text-8xl text-white"}>
              <p>Smart</p>
              <p className={"-mt-3 ml-10"}>Hourly</p>
            </div>
          </div>
          <p className={"text-5xl text-neutral-700 mt-4 text-center"}>
            Helping you to find your service price
          </p>
        </div>
        <div className='h-[100vh] flex flex-col'>
          <div className='flex justify-end'>
            <ThemeToggle />
          </div>
          <div className='flex flex-1 items-center justify-center'>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
