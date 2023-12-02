import { cn } from "../utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button = ({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "rounded-md bg-blue-800 px-4 leading-8 text-white transition-colors hover:bg-blue-500 hover:ring-1 hover:ring-blue-800 disabled:opacity-50",
        variant === "secondary" &&
          "border bg-white text-blue-800 hover:border-gray-200 hover:bg-neutral-200 hover:ring-0",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
