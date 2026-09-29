"use client";

import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { Input, type InputProps } from "@/components/ui/Input";

type PasswordInputProps = Omit<InputProps, "type" | "rightIcon">;

const PasswordInput = ({ ref, ...props }: PasswordInputProps) => {
  const [visible, setVisible] = useState(false);

  const toggleIcon = (
    <button
      type="button"
      tabIndex={-1}
      onClick={() => setVisible((v) => !v)}
      className="cursor-pointer text-gray-400 transition-colors hover:text-white"
      aria-label={visible ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
    >
      {visible ? (
        <HiOutlineEyeOff className="text-xl" />
      ) : (
        <HiOutlineEye className="text-xl" />
      )}
    </button>
  );

  return (
    <Input
      ref={ref}
      type={visible ? "text" : "password"}
      rightIcon={toggleIcon}
      {...props}
    />
  );
};

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
export type { PasswordInputProps };
