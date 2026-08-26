import type { TechStackItem } from "@/data/skills";
import { cn } from "@/lib/utils";

interface TechStackIconProps {
  item: TechStackItem;
  className?: string;
}

export function TechStackIcon({ item, className }: TechStackIconProps) {
  const iconClass = cn(
    "shrink-0 transition-transform duration-300 group-hover:scale-110",
    className
  );

  if (item.iconSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={item.iconSrc}
        alt=""
        className={cn(
          iconClass,
          item.monochrome && "brightness-0 dark:invert"
        )}
        width={24}
        height={24}
        aria-hidden
      />
    );
  }

  const Icon = item.icon;
  if (!Icon) return null;

  if (item.monochrome) {
    return <Icon className={cn(iconClass, "text-foreground")} aria-hidden />;
  }

  return <Icon className={iconClass} style={{ color: item.color }} aria-hidden />;
}
