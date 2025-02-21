'use client'

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { LucideCog, LucideFileStack, LucideLayoutDashboard } from "lucide-react";
import { SidebarItem, SidebarItemProps } from "@/components/application/sidebar/item/sidebar-item";
import { usePathname } from "next/navigation";

const menuItems: SidebarItemProps[] = [
  {
    title: "Dashboard",
    link: "/",
    description: "Overview of your business",
    Icon: LucideLayoutDashboard,
  },
  {
    title: "Orders",
    link: "/orders",
    description: "View and manage customer orders",
    Icon: LucideFileStack
  },
  {
    title: "Settings",
    link: "/settings",
    description: "Configure your costs",
    Icon: LucideCog,
    showSeparator: false
  }
];

export default function ApplicationSidebar () {
  const pathName = usePathname()

  return (
    <Card className={"bg-gray-100 dark:bg-gray-800 min-w-60 max-w-64 h-full flex flex-col justify-between"}>
      <CardContent className={"flex-1 px-0"}>
        { menuItems.map(item => <SidebarItem {...item} key={item.link} active={item.link === pathName}/>) }
      </CardContent>

      <CardFooter className={"flex flex-col p-6 items-center text-gray-300 dark:text-white select-none"}>
        <span>© 2021 SmartHourly</span>
        <span>Version 0.0.1</span>
      </CardFooter>
    </Card>
  );
}