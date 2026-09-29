"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/classNames";
import { AnimatePresence, motion } from "@/lib/motion";
import { RiCloseLargeFill } from "react-icons/ri";
interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
    title?: React.ReactNode | string;
    showCloseButton?: boolean;
    closeOnOverlayClick?: boolean;
    /** Nhãn cho dialog (a11y). Nên set khi không có tiêu đề visible. */
    "aria-label"?: string;
    footer?: React.ReactNode;
    positionFooter?: "start" | "end" | "center";
    contentClassName?: string;
    headerClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
    open,
    onClose,
    children,
    className = "",
    title,
    showCloseButton = true,
    closeOnOverlayClick = false,
    "aria-label": ariaLabel,
    footer,
    positionFooter = "end",
    contentClassName = "",
    headerClassName = "",
}) => {
    const onCloseRef = useRef(onClose);
    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    const handleOverlayClick = useCallback(() => {
        if (closeOnOverlayClick) onClose();
    }, [closeOnOverlayClick, onClose]);

    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onCloseRef.current();
        };
        window.addEventListener("keydown", handleEscape);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", handleEscape);
        };
    }, [open]);

    // if (!open) return null;
    if (typeof document === "undefined") return null;

    const hasHeader = title != null && title !== "";

    const dialog = (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            className={cn(
                "fixed inset-0 z-200 flex items-start justify-center bg-black/50 p-4 pt-20 md:pt-24"
            )}
            onClick={handleOverlayClick}
        >
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.2 }}
                className="relative"
            >
                {showCloseButton ? (
                    <Button
                        onClick={onClose}
                        className={cn("size-7 absolute top-2 right-2 z-10 rounded-full",
                            "text-white",
                            "hover:text-[#666]",
                            "transition-all duration-300"
                        )}
                        variant="transparent"
                        aria-label="Close"
                    >
                        <RiCloseLargeFill className="size-4" aria-hidden />
                    </Button>
                ) : null}



                <div
                    className={cn(
                        "relative min-w-[300px] max-w-[95vw] max-h-[90vh] shadow-2xl bg-white",
                        "flex flex-col overflow-hidden",
                        className
                    )}
                    onClick={(e) => e.stopPropagation()}
                >
                    {hasHeader && (
                        <div className={cn("flex items-center justify-center border-b relative",
                            "px-[30px] py-[15px] bg-linear-to-r from-[#3a2a12] to-[#120c06] shrink-0 ",
                            headerClassName)}>
                            {typeof title === "string" ? (
                                <h2 className="min-w-0 flex-1 truncate text-base text-left font-bold text-white md:text-[2rem]">{title}</h2>
                            ) : (
                                title
                            )}
                        </div>
                    )}
                    <div className={cn("flex-1 scrollbar overflow-y-auto overscroll-contain", contentClassName)}>{children}</div>

                    {/* Footer */}
                    {footer && (
                        <div className={cn("flex items-center justify-end border-t border-gray-200",
                            positionFooter === "start" && "justify-start", positionFooter === "center" && "justify-center",
                            "gap-3 px-[30px] py-[15px] shrink-0")}>
                            {footer}
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );

    return createPortal(
        <AnimatePresence>
            {open && dialog}
        </AnimatePresence>,
        document.body
    );
}

export default Modal;