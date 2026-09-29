"use client";

import { cn } from "@/utils/classNames";
import Image from "next/image";
import React from "react";
import { HiChevronRight } from "react-icons/hi2";

interface GameCardProps {
    image: string;
    title: string;
    logo: string;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
}

const GameCard = ({
    image,
    title,
    // Giữ để bật lại logo thương hiệu ở thanh dưới.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    logo,
    className,
    onClick,
    disabled,
}: GameCardProps) => {
    return (
        <div
            role="button"
            tabIndex={disabled ? -1 : 0}
            onClick={onClick}
            onKeyDown={(e) => {
                if (disabled) return;
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onClick?.();
                }
            }}
            className={cn(
                "group aspect-square relative cursor-pointer overflow-hidden rounded-2xl border border-[#d4af37]/70 bg-black",
                disabled && "pointer-events-none opacity-50",
                className
            )}
        >
            <Image
                src={image}
                alt={title}
                width={353}
                height={197}
                className="aspect-353/197 h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-black/75 px-2.5 py-2 md:px-3 md:py-2.5">
                {/* {logo ? (
                    <Image
                        src={logo}
                        alt=""
                        width={28}
                        height={28}
                        className="size-6 shrink-0 rounded-full object-contain md:size-7"
                    />
                ) : null} */}
                <span className="min-w-0 flex-1 truncate text-left text-xs text-white md:text-sm">
                    {title}
                </span>
                <HiChevronRight className="size-4 shrink-0 text-[#f6e7c1] md:size-5" aria-hidden />
            </div>
        </div>
    );
};

export default GameCard;
