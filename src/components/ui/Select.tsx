"use client";

import {
  type SelectHTMLAttributes,
  type ReactNode,
  type Ref,
  useId,
} from "react";
import { cn } from "@/utils/classNames";

const selectBaseClass =
  "w-full h-10 rounded-lg border border-[#22242626] bg-white px-4 py-2 text-sm text-black transition-all " +
  "focus:outline-none focus:ring-2 focus:ring-[#2185D0]/40 focus:border-[#2185D0] disabled:cursor-not-allowed disabled:opacity-50 " +
  "appearance-none cursor-pointer";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: ReactNode;
  labelClassName?: string;
  error?: string;
  options: SelectOption[];
  fullWidth?: boolean;
  containerClassName?: string;
  ref?: Ref<HTMLSelectElement>;
}

const Select = ({
  className,
  label,
  labelClassName,
  error,
  options,
  fullWidth,
  containerClassName,
  id,
  ref,
  ...props
}: SelectProps) => {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <div
      className={cn("flex flex-col gap-1.5", fullWidth && "w-full", containerClassName)}
    >
      {label ? (
        <label
          htmlFor={selectId}
          className={cn("text-black/87 font-bold text-sm", labelClassName)}
        >
          {label}
        </label>
      ) : null}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          className={cn(
            selectBaseClass,
            error
              ? "border-red-400/80 focus:border-red-400 focus:ring-red-400/40"
              : undefined,
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
          <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>
      {error ? <p className="text-xs font-semibold text-red-400">{error}</p> : null}
    </div>
  );
};

Select.displayName = "Select";

export { Select };
