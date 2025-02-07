import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full p-4 my-2 text-sm font-bold text-primary-title",
          "rounded-xl border-2 border-input",
          "placeholder:text-placeholder placeholder:text-sm placeholder:font-normal",
          "focus-visible:outline-none focus-visible:ouline-gradient",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
