"use client";

import { type ReactNode } from "react";
import { cn } from "@/utils/classNames";

const proseBody =
  "max-w-none text-sm text-gray-200 " +
  "[&_h2]:mb-1 [&_h2]:mt-4 [&_h2]:first:mt-0 [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-white " +
  "[&_p]:mb-1.5 [&_p]:leading-relaxed " +
  "[&_strong]:font-bold [&_strong]:text-gray-100";

type NoticeProseProps = {
  children: ReactNode;
  className?: string;
};

/** Bọc nội dung chi tiết 공지: kiểu “prose” tối, không cần plugin typography. */
export function NoticeProse({ children, className }: NoticeProseProps) {
  return <div className={cn(proseBody, className)}>{children}</div>;
}
