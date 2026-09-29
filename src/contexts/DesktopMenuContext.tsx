"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/utils/classNames";

/** Rộng panel menu desktop (px) — đồng bộ với `w-[300px]` trong Header. */
export const DESKTOP_MENU_WIDTH_PX = 300;

type DesktopMenuContextValue = {
  isDesktopMenuOpen: boolean;
  setIsDesktopMenuOpen: (open: boolean) => void;
  toggleDesktopMenu: () => void;
  closeDesktopMenu: () => void;
};

const DesktopMenuContext = createContext<DesktopMenuContextValue | null>(null);

/** Khớp `duration-300` trên wrapper + buffer nhỏ để tránh scrollbar ngang lúc transition về 0 */
const CLOSE_OVERFLOW_LOCK_MS = 340;

function lockDocumentOverflowX() {
  document.documentElement.style.overflowX = "hidden";
  document.body.style.overflowX = "hidden";
}

function restoreDocumentOverflowX() {
  document.documentElement.style.removeProperty("overflow-x");
  document.body.style.removeProperty("overflow-x");
}

export function DesktopMenuProvider({ children }: { children: ReactNode }) {
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const wasMenuOpenRef = useRef(false);

  const closeDesktopMenu = useCallback(() => setIsDesktopMenuOpen(false), []);
  const toggleDesktopMenu = useCallback(() => setIsDesktopMenuOpen((v) => !v), []);

  const value = useMemo(
    () => ({
      isDesktopMenuOpen,
      setIsDesktopMenuOpen,
      toggleDesktopMenu,
      closeDesktopMenu,
    }),
    [isDesktopMenuOpen, closeDesktopMenu, toggleDesktopMenu]
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (!mq.matches) setIsDesktopMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (isDesktopMenuOpen) {
      lockDocumentOverflowX();
      wasMenuOpenRef.current = true;
      return;
    }

    if (wasMenuOpenRef.current) {
      wasMenuOpenRef.current = false;
      lockDocumentOverflowX();
      const tid = window.setTimeout(() => {
        restoreDocumentOverflowX();
      }, CLOSE_OVERFLOW_LOCK_MS);
      return () => clearTimeout(tid);
    }
  }, [isDesktopMenuOpen]);

  useEffect(
    () => () => {
      restoreDocumentOverflowX();
    },
    []
  );

  return (
    <DesktopMenuContext.Provider value={value}>
      <div
        className={cn(
          "flex min-h-screen overflow-x-hidden w-full flex-col transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isDesktopMenuOpen && "lg:translate-x-(--desktop-menu-shift)"
        )}
        style={
          { "--desktop-menu-shift": `${DESKTOP_MENU_WIDTH_PX}px` } as CSSProperties
        }
      >
        {children}
      </div>
    </DesktopMenuContext.Provider>
  );
}

export function useDesktopMenu() {
  const ctx = useContext(DesktopMenuContext);
  if (!ctx) {
    throw new Error("useDesktopMenu must be used within DesktopMenuProvider");
  }
  return ctx;
}
