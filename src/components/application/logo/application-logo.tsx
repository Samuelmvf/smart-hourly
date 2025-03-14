import { CircleDollarSign } from "lucide-react";

export function ApplicationLogo() {
  return (<div className={"flex gap-2 text-left justify-center items-center select-none"}>
    <CircleDollarSign size={40} className={"text-yellow-500"} />

    <h1 className={"text-2xl"}>
      <p className={"text-gray-500 dark:text-white"}>Smart</p>
      <p className={"text-yellow-500 -mt-3 ml-3"}>Hourly.</p>
    </h1>
  </div>);
}