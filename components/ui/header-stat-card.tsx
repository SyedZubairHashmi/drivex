import type { LucideIcon } from "lucide-react";

interface HeaderStatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  className?: string;
}

export function HeaderStatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  className,
}: HeaderStatCardProps) {
  return (
    <>
      <div className="w-[309px] h-[86.67px] rounded-xl border border-gray-400 p-[14.67px_10px] flex flex-col justify-between">
        <div className="text-sm  text-black-500">{title}</div>
        <div className="flex justify-between items-end">
          <div className="text-2xl font-bold text-black">{value}</div>
          <p className="text-[10px] text-gray-500">{subtitle}</p>
        </div>
      </div>
    </>
  );
}