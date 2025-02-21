import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export interface SidebarItemProps {
  title: string;
  link: string;
  description?: string;
  Icon?: LucideIcon;
  showSeparator?: boolean;
  active?: boolean;
}

export function SidebarItem({ title, link, description, Icon, showSeparator = true, active = false } : SidebarItemProps) {
  return (
    <Link href={link}>
      <Button variant={"none"} className={`flex w-full py-8 hover:bg-yellow-300/75 dark:hover:bg-gray-700 hover:text-accent-foreground ${active ? "bg-yellow-300/50 dark:bg-gray-700/50" : ""}`}>
        <div className={"flex flex-col"}>
          <div className={"flex justify-center items-center gap-2"}>
            {Icon && <Icon/>}
            <span className={"font-semibold"}>{title}</span>
          </div>

          {description && <CardDescription>{description}</CardDescription>}
        </div>
      </Button>
      { showSeparator && <Separator />}
    </Link>
  )
}