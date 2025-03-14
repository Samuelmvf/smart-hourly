import { LucideIcon } from "lucide-react";

interface PageTitleProps {
  title: string;
  Icon?: LucideIcon;
}
export function PageTitle({ title, Icon }: PageTitleProps) {
  return (
    <div className='flex items-center gap-2 text-2xl font-semibold'>
      {Icon && <Icon />}
      {title}
    </div>
  );
}
