"use client";

import {
  type InputHTMLAttributes,
  type ReactNode,
  type Ref,
  useId,
} from "react";
import { cn } from "@/utils/classNames";

const inputBaseClass =
  "w-full h-10 rounded-lg border border-[#22242626] bg-white px-4 py-2 text-sm text-black transition-all " +
  "focus:outline-none focus:ring-2 focus:ring-[#2185D0]/40 focus:border-[#2185D0] disabled:cursor-not-allowed disabled:opacity-50" +
  "placeholder:text-gray-500 placeholder:font-normal ";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: ReactNode;
  labelClassName?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  containerClassName?: string;
  ref?: Ref<HTMLInputElement>;
}

const Input = ({
  className,
  label,
  labelClassName,
  error,
  leftIcon,
  rightIcon,
  fullWidth,
  containerClassName,
  id,
  ref,
  placeholder,
  ...props
}: InputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div
      className={cn("flex flex-col gap-1.5", fullWidth && "w-full", containerClassName)}
    >
      {label ? (
        <label
          htmlFor={inputId}
          className={cn("text-black/87 font-bold text-sm", labelClassName)}
        >
          {label}
        </label>
      ) : null}
      <div className="relative">
        {leftIcon ? (
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            {leftIcon}
          </span>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          placeholder={placeholder}
          className={cn(
            inputBaseClass,
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            error
              ? "border-red-400/80 focus:border-red-400 focus:ring-red-400/40"
              : undefined,
            className
          )}
          {...props}
        />
        {rightIcon ? (
          <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
            {rightIcon}
          </span>
        ) : null}
      </div>
      {error ? <p className="text-xs font-semibold text-red-400">{error}</p> : null}
    </div>
  );
};

Input.displayName = "Input";

export { Input };
