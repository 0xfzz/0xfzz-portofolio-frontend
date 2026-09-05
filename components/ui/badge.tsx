import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary/10 text-secondary hover:bg-secondary/20",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
      // Additive second axis (D13): call sites keep variant="secondary" and name their chip look here
      // instead of raw-overriding className. Reproduces today's exact twMerge inputs, including the
      // inherited hover:bg-secondary/20 + border-transparent from `secondary`. Optional/absent by default.
      chip: {
        "filter-active":
          "px-5 py-2 text-xs font-bold rounded-md transition-all cursor-pointer border-none bg-secondary text-white",
        "filter-inactive":
          "px-5 py-2 text-xs font-bold rounded-md transition-all cursor-pointer border-none bg-chip/80 text-foreground hover:bg-chip",
        "stack-lg":
          "px-6 py-3 text-sm font-bold bg-chip/80 text-foreground border-none rounded-xl",
        overlay:
          "bg-chip text-foreground border-none px-3 py-1 text-[12px] font-bold rounded-sm shadow-sm",
        "overlay-sm":
          "bg-chip text-foreground border-none px-3 py-1 text-[10px] font-bold rounded-sm shadow-sm",
        tag: "bg-chip/40 text-foreground border-none px-3 py-1 text-[13px] font-bold rounded-sm",
        "tag-sm":
          "bg-chip/40 text-foreground border-none px-3 py-1 text-[11px] font-bold rounded-sm",
        "meta-tag":
          "bg-chip/40 text-foreground border-none px-2.5 py-0.5 text-[12px] font-bold rounded-sm whitespace-nowrap",
        experience:
          "bg-accent text-muted-foreground border-none px-3 py-0.5 text-[12px] font-bold rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, chip, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, chip }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
