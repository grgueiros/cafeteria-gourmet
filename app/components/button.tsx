import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "~/utils/cn";

const buttonVariants = cva(
  ["px-3", "py-2", "text-center", "text-2xl", "text-black", "rounded-lg"],
  {
    variants: {
      variant: {
        default: "bg-cream",
        secondary: "bg-lightCream",
        success: "bg-successGreen",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, className, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      ></button>
    );
  }
);

Button.displayName = "Button";

export default Button;
