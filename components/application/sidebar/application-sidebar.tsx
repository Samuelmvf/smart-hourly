import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { LucideCog, LucideFileStack, LucideLayoutDashboard } from "lucide-react";
import { SidebarItem, SidebarItemProps } from "@/components/application/sidebar/item/sidebar-item";

const menuItems: SidebarItemProps[] = [
  {
    title: "Dashboard",
    link: "/dashboard",
    description: "See details of your orders",
    Icon: LucideLayoutDashboard,
  },
  {
    title: "Orders",
    link: "/orders",
    description: "Manage your orders",
    Icon: LucideFileStack
  },
  {
    title: "Settings",
    link: "/settings",
    Icon: LucideCog,
    showSeparator: false
  }
]

export default function ApplicationSidebar () {
  return (
    <Card className={"bg-gray-100 dark:bg-gray-800 min-w-60 max-w-64 h-full flex flex-col justify-between"}>
      <CardContent className={"flex-1 px-0 mt-4"}>
        {menuItems.map(item => {
          return <SidebarItem {...item}/>
        })}
      </CardContent>
      <CardFooter className={"flex flex-col p-8 items-center text-gray-300 dark:text-white select-none"}>
        <span>© 2021 SmartHourly</span>
        <span>Version 0.0.1</span>
      </CardFooter>
    </Card>
  );
}