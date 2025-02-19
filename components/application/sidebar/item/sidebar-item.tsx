import Link from "next/link";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import {Separator} from "@/components/ui/separator";

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
      <div className={"flex justify-center items-center"}>
        <div className={`py-4 ${ active ? "bg-yellow-50" : "bg-gray-100"} px-8 flex-1`}>
          <CardTitle className={"flex items-center gap-2"}>
            {Icon && <Icon />}
            <span>{title}</span>
          </CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        { active && <div className={"w-2 h-11 bg-yellow-500"}></div>}
      </div>
      { showSeparator && <Separator/>}
    </Link>
  )
}