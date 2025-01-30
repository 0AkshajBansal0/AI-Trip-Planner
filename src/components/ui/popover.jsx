import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef(
  ({ className, align = "center", sideOffset = 8, ...props }, ref) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 max-w-sm rounded-xl border border-gray-200 bg-white/90 backdrop-blur-lg p-4 text-black shadow-xl transition-all duration-300 ease-out",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-50 data-[state=open]:fade-in-50",
          "data-[state=closed]:scale-95 data-[state=open]:scale-100",
          "data-[side=bottom]:slide-in-from-top-4 data-[side=top]:slide-in-from-bottom-4",
          "hover:shadow-2xl hover:border-gray-300",
          className
        )}
        aria-live="polite"
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
