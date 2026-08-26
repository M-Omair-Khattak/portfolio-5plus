import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

export function Badge({
  className,
  variant = "default",
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "secondary" | "outline";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
        variant === "default" &&
          "bg-accent/10 text-accent border border-accent/20",
        variant === "secondary" &&
          "bg-muted text-muted-foreground border border-border",
        variant === "outline" &&
          "border border-border text-foreground bg-transparent",
        className
      )}
      {...props}
    />
  );
}
