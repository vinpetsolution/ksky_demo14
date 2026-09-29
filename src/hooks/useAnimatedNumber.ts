"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

export type UseAnimatedNumberOptions = {
  /** Thời gian chạy từ giá trị cũ sang giá trị mới (ms). */
  durationMs?: number;
};

/**
 * Khi `target` đổi (tăng hoặc giảm), giá trị hiển thị được nội suy mượt tới `target`.
 */
export function useAnimatedNumber(
  target: number,
  options?: UseAnimatedNumberOptions
): number {
  const durationMs = options?.durationMs ?? 1600;
  const [display, setDisplay] = useState(target);
  const displayRef = useRef(display);

  useLayoutEffect(() => {
    displayRef.current = display;
  }, [display]);

  useEffect(() => {
    const from = displayRef.current;
    if (from === target) return;

    let rafId = 0;
    let cancelled = false;
    const start = performance.now();
    const delta = target - from;

    const tick = (now: number) => {
      if (cancelled) return;
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - (1 - t) ** 3;
      const next = from + delta * eased;
      setDisplay(next);
      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else if (!cancelled) {
        setDisplay(target);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, [target, durationMs]);

  return display;
}
