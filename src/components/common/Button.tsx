import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "accent";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    icon: ReactNode; // Icon is mandatory
    children: string;
}

const buttonVariants: Record<ButtonVariant, string> = {
    primary: "bg-slate-200 text-slate-800 hover:bg-slate-300",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
    accent: "bg-blue-200 text-blue-900 hover:bg-blue-300",
};

const Button: React.FC<ButtonProps> = ({ variant = "primary", icon, children, className, ...props }) => {
    return (
        <button
            className={cn(
                "flex items-center w-full px-5 py-2 rounded-sm font-medium transition",
                "hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none",
                buttonVariants[variant],
                className
            )}
            {...props}
        >
            {/* Icon stays on the far left */}
            <span className="flex items-center text-lg">{icon}</span>

            {/* Text is centered in remaining space */}
            <span className="flex-1 text-center">{children}</span>
        </button>
    );
};

export default Button;
