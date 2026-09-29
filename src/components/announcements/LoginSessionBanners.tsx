"use client";

import { useCallback, useState, type ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/utils/classNames";
import { Button } from "../ui/Button";
import styles from "./LoginSessionBanners.module.css";

type BannerLayout = "left" | "center" | "right";

const GRID_COL: Record<BannerLayout, string> = {
  left: "col-start-1 lg:col-start-1",
  center: "col-start-1 lg:col-start-2",
  right: "col-start-1 lg:col-start-3",
};

export type LoginBannerItem = {
  id: string;
  title: string;
  layout: BannerLayout;
  className?: string;
  children: ReactNode;
};

const BANNERS: LoginBannerItem[] = [
  {
    id: "deposit-urgent",
    title: "계좌 입금 금지 (긴급)",
    layout: "left",
    className: " justify-self-start",
    children: (
      <div className="h-[300px] font-bold text-3xl text-white">
        <h2>
          현재 입금 계좌에 문제가 발생하여 정상적인 입금 업무를 수행할 수 없는 상황입니다.
        </h2>
        <h2>
          입금 전 반드시 상위에 문의하여 처리하여 주시기 바랍니다.
        </h2>
        <h2>
          계좌 입금 시 확인이 안되어 충전이 불가능 하니 이점 꼭 유의하시기 바랍니다
        </h2>
      </div>
    ),
  },
  {
    id: "casino-betting",
    title: "카지노 이용시 양방베팅 및 마틴베팅 관련 안내입니다",
    layout: "center",
    className: " justify-self-center",
    children: (
      <div className=" text-xs leading-relaxed text-white">
        <p>
          카지노 이용시 연속으로 3번이상 같은곳에 베팅하였을시에는 양방베팅으로 간주되며 전액 몰수처리 될수 있으므로 이용에 주의해주시기 바라며
        </p>
        <br />
        <p>잃은금액을 3번연속으로 덮어쓰는 베팅또한 마틴으로 간주되어 몰수처리 될수 있으므로 주의 해주시기바랍니다 </p>
        <br />
        <br />
        <br />
        <p>위 내용 필히 확인하시어 이용에 불이익 없도록 규정사항 준수해주시기 바랍니다 </p>
      </div>
    ),
  },
  {
    id: "slot-notice",
    title: "슬롯 게임 배팅 및 당첨 한도 안내 ",
    layout: "right",
    className: " justify-self-end",
    children: (
      <div className=" space-y-4 text-sm leading-relaxed text-white/95">
        <h2 className="text-3xl font-bold">---슬롯 공지---</h2>
        <br />
        <h2 className="text-3xl font-bold">
          슬롯 최대 당첨 배수는 5000배이며, 최대 당첨금(잭팟 포함)은
          <span className="text-[#e60000]"> 2천만원</span>
          임을 알려드립니다.
        </h2>
        <br />
        <h2 className="text-3xl font-bold">즉, 최대 당첨 금액 2000만원 한도 내에서 본인이 배팅한 금액의 5000배까지 인정됩니다.</h2>
        <br />
        <h2 className="text-3xl font-bold">
          (단, 프라그마틱 그림장과 상관없이 프라그마틱에서 주최하는 자체 이벤트 잭팟의 경우 최대 500만원까지 인정됩니다.)
        </h2>
        <br />
        <h2 className="text-3xl font-bold">
          슬롯 배팅 금액은
          <span className="text-[#e60000]"> 1만원</span>
          까지만 가능하시고
          <span className="text-[#e60000]">무료 스핀 금액은 100만원 까지만 가능합니다</span>
          .
        </h2>
      </div>
    ),
  },
];

export default function LoginSessionBanners() {
  const { isAuthenticated, isLoading } = useAuth();
  const [closed, setClosed] = useState<Set<string>>(() => new Set());

  const closeOne = useCallback((id: string) => {
    setClosed((prev) => new Set(prev).add(id));
  }, []);

  const openIds = BANNERS.filter((b) => !closed.has(b.id)).map((b) => b.id);
  const showLayer = isAuthenticated && !isLoading && openIds.length > 0;

  if (!showLayer) return null;

  return (
    <div className="pointer-events-none relative z-210 h-0 w-full shrink-0 overflow-visible">
      <div
        className={cn(
          "pointer-events-none absolute top-[120px] right-0 left-0 z-210",
          "px-2 sm:px-3"
        )}
      >
        <div className="pointer-events-none mx-auto grid w-full max-w-[90vw] grid-cols-1 gap-4 lg:grid-cols-3 lg:items-start lg:gap-3">
          {BANNERS.map((banner) =>
            closed.has(banner.id) ? null : (
              <article
                key={banner.id}
                className={cn(
                  "pointer-events-auto flex min-h-0 w-full flex-col overflow-hidden border border-[#e9e9e999] bg-black shadow-[0_12px_32px_rgba(0,0,0,0.4)]",
                  "max-h-[min(80vh,100vh)] min-w-0 row-auto lg:row-start-1",
                  GRID_COL[banner.layout],
                  banner.className
                )}
                role="dialog"
                aria-modal="false"
                aria-labelledby={`login-banner-title-${banner.id}`}
              >
                <header className="relative flex min-h-9 shrink-0 items-center gap-2 bg-black px-1.5 py-1 pr-8 text-white">
                  <h2
                    id={`login-banner-title-${banner.id}`}
                    className="min-w-0 flex-1 pr-1 text-left text-xs leading-snug sm:text-sm"
                  >
                    {banner.title}
                  </h2>
                  <Button
                    variant="transparent"
                    onClick={() => closeOne(banner.id)}
                    className="absolute right-1 top-1/2 size-8 shrink-0 -translate-y-1/2 p-0 text-white  hover:text-white"
                    aria-label="닫기"
                  >
                    ×
                  </Button>
                </header>
                <div
                  className={cn(
                    styles.contentScroll,
                    "min-h-0 flex-1 overflow-y-auto bg-[#ffffff22] px-4 py-4"
                  )}
                >
                  {banner.children}
                </div>
                <footer className="flex shrink-0 justify-end bg-black px-1.5 py-1">
                  <Button
                    variant="transparent"
                    onClick={() => closeOne(banner.id)}
                    className="text-xs text-white/70 p-0 h-auto transition hover:text-white"
                  >
                    오늘하루 그만보기
                  </Button>
                </footer>
              </article>
            )
          )}
        </div>
      </div>
    </div>
  );
}
