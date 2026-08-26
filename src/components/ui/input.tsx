import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes } from "react";

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-xl border border-border bg-muted/50 px-4 py-2 text-sm transition-colors",
        "placeholder:text-muted-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-accent/50",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
