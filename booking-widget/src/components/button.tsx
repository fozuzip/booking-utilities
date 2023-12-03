import * as React from "react";
import { cn } from "../utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "rounded-md bg-blue-800 px-4 leading-8 text-white transition-colors hover:bg-blue-500 hover:ring-1 hover:ring-blue-800 disabled:opacity-50",
          variant === "secondary" &&
            "border bg-white text-blue-800 hover:border-gray-200 hover:bg-neutral-200 hover:ring-0",
          variant === "ghost" &&
            "hover border-none bg-transparent text-xs text-blue-800 hover:border-none hover:bg-transparent hover:text-blue-500 hover:ring-0",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
