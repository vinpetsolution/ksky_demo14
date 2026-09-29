"use client";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import { Button } from "@/components/ui/Button";
import GameCard from "@/components/ui/GameCard";

import { CASINO_GAMES, SLOT_GAMES } from "@/constants";
import { useModal } from "@/contexts/ModalContext";
import { useAnimatedNumber, useGameLauncher } from "@/hooks";
import { DEMO_SLOT_GAMES } from "@/data/slotGames";
import type { GameItem } from "@/types/vendor";
import Image from "next/image";
import { useState, useCallback, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "@/lib/motion";
import { cn } from "@/utils/classNames";
import { formatNumber } from "@/utils/format";
import Modal from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { HiArrowPath } from "react-icons/hi2";
import { BsGrid3X3GapFill } from "react-icons/bs";

export default function Home() {
  const { requireAuth } = useModal();
  const { launchCasinoGame, launchSlotGame, isProcessing } = useGameLauncher();

  const [tab, setTab] = useState<"casino" | "slot">("slot");
  const [slotGames, setSlotGames] = useState<GameItem[]>([]);
  const [slotVendorId, setSlotVendorId] = useState<string | null>(null);
  const [isLoadingSlotGames, setIsLoadingSlotGames] = useState(false);
  const [showSlotPopup, setShowSlotPopup] = useState(false);
  const [slotSearchDraft, setSlotSearchDraft] = useState("");
  const [slotSearchApplied, setSlotSearchApplied] = useState("");

  const handleCasinoPlay = useCallback((vendorId?: string) => {
    if (!vendorId) return;
    requireAuth(() => {
      launchCasinoGame(vendorId);
    });
  }, [requireAuth, launchCasinoGame]);

  const handleSlotVendorClick = useCallback((vendorId?: string) => {
    if (!vendorId) return;
    requireAuth(() => {
      setSlotVendorId(vendorId);
      setSlotSearchDraft("");
      setSlotSearchApplied("");
      setSlotGames(DEMO_SLOT_GAMES);
      setIsLoadingSlotGames(false);
      setShowSlotPopup(true);
    });
  }, [requireAuth]);

  const handleSlotGameClick = useCallback(async (gameCode: string) => {
    if (!slotVendorId) return;
    setShowSlotPopup(false);
    await launchSlotGame(slotVendorId, gameCode);
    setSlotGames([]);
    setSlotVendorId(null);
  }, [slotVendorId, launchSlotGame]);

  const refreshSlotGames = useCallback(() => {
    if (!slotVendorId) return;
    setSlotGames(DEMO_SLOT_GAMES);
  }, [slotVendorId]);

  const handleSlotSearchSubmit = useCallback(() => {
    setSlotSearchApplied(slotSearchDraft.trim());
  }, [slotSearchDraft]);

  const filteredSlotGames = useMemo(() => {
    const q = slotSearchApplied.toLowerCase();
    if (!q) return slotGames;
    return slotGames.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        g.name_en.toLowerCase().includes(q) ||
        g.code.toLowerCase().includes(q)
    );
  }, [slotGames, slotSearchApplied]);

  /** Jackpot: thêm setter khi nối API — `const [jackpotAmount, setJackpot] = useState(…)` rồi gọi `setJackpot`. */
  const [jackpotAmount, setJackpotAmount] = useState(2513677);
  const canClickJackpot = useCallback(() => {
    setJackpotAmount(jackpotAmount + 10000000);
  }, [jackpotAmount]);
  const animatedJackpot = useAnimatedNumber(jackpotAmount, { durationMs: 2000 });

  useEffect(() => {
    const interval = setInterval(() => {
      canClickJackpot();
    }, 5000);
    return () => clearInterval(interval);
  }, [canClickJackpot]);

  return (
    <>
      <Header />
      <main className="mt-15.5 flex flex-1 flex-col bg-black">
        {/* Slide */}
        <div
          className={cn(
            "relative mx-auto flex w-full items-center justify-center overflow-hidden text-base",
            "min-h-62.5 aspect-1916/821",
            "bg-[url('/images/banner.png')] bg-cover bg-center bg-no-repeat",
          )}
        >
          <div className="absolute top-1/2 left-0 z-10 hidden w-full max-w-xl -translate-y-1/2 flex-col rounded-r-2xl bg-linear-to-r from-black/70 via-black/45 to-transparent py-6 pr-10 pl-6 text-left md:flex md:pl-10 lg:pl-16">
            <h1 className="w-fit text-[40px] leading-tight font-bold text-[#f6e7c1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] lg:text-5xl">
              환영합니다.
            </h1>
            <span
              className="mt-3 block h-[3px] w-20 rounded-full bg-[#e8b923] shadow-[0_0_10px_rgba(232,185,35,0.55)]"
              aria-hidden
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] md:text-base">
              K SKY SOLUTION은 최고의 슬롯게임과 라이브 카지노를 제공하여, 회원 여러분의 만족을 위해 최선을 다합니다.
            </p>
          </div>
          <div className="absolute right-1/2 bottom-1 z-10 w-[70%] translate-x-1/2 md:right-4 md:bottom-2 md:w-[42%] md:translate-x-0 lg:w-140">
            <div className="relative aspect-1582/882 w-full">
              <Image
                src="/images/frame.png"
                alt="progressive jackpot"
                width={1582}
                height={882}
                priority
                className="absolute inset-0 h-full w-full object-contain"
              />
              <div className="absolute top-[calc(567/882*100%)] left-[calc(94/1582*100%)] flex h-[calc(232/882*100%)] w-[calc(1396/1582*100%)] items-center justify-center overflow-hidden px-2">
                <span
                  className="block min-w-0 w-full truncate text-center text-2xl tracking-[2px] text-[#ffc000] tabular-nums md:text-3xl lg:text-[40px] lg:tracking-[4px]"
                  style={{ fontFamily: "fantasy" }}
                >
                  {formatNumber(Math.round(animatedJackpot))}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10 w-full pt-2 bg-black">
          <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-3 px-3 md:grid-cols-2 md:gap-4 md:px-6">
            <button
              type="button"
              onClick={() => setTab("slot")}
              className={cn(
                "relative isolate aspect-[2172/724] w-full cursor-pointer overflow-hidden rounded-3xl",
                tab === "slot" ? "brightness-110 ring-2 ring-[#e8b923]" : "brightness-95"
              )}
            >
              <Image
                src="/images/bg_slot_game1.png"
                alt=""
                width={2172}
                height={724}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </button>
            <button
              type="button"
              onClick={() => setTab("casino")}
              className={cn(
                "relative isolate aspect-[2172/724] w-full cursor-pointer overflow-hidden rounded-3xl",
                tab === "casino" ? "brightness-110 ring-2 ring-[#e8b923]" : "brightness-95"
              )}
            >
              <Image
                src="/images/bg_live_casino1.png"
                alt=""
                width={2172}
                height={724}
                className="absolute inset-0 h-full w-full object-cover"
              />

            </button>
          </div>
          <div className="relative z-0 -mt-[4.5%]">
            <Image
              src="/images/bgksky.png"
              alt="K SKY SOLUTION"
              width={2172}
              height={724}
              className="block h-auto w-full"
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[32%] bg-linear-to-b from-black via-black/65 to-transparent" />
          </div>
        </div>
        <div className="pt-6 md:pt-8 pb-8 md:pb-10 px-4 md:px-10 ">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              {/* <h2 className="text-[#2588ce] text-center my-5 text-3xl font-bold"
              >
                {tab === "casino" ? "LIVE CASINO" : "SLOTS"}
              </h2> */}
              <div className="grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {tab === "casino" ? (
                  CASINO_GAMES.map((game) => (
                    <GameCard
                      key={game.id}
                      image={game.image}
                      title={game.title}
                      logo={game.logo}
                      onClick={() => handleCasinoPlay(game.vendorId)}
                      disabled={isProcessing}
                    />
                  ))
                ) : (
                  SLOT_GAMES.map((game) => (
                    <GameCard
                      key={game.id}
                      image={game.image}
                      title={game.title}
                      logo={game.logo}
                      onClick={() => handleSlotVendorClick(game.vendorId)}
                      disabled={isProcessing}
                    />
                  ))
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Casino */}
        {/* <section className="max-w-7xl mx-auto px-4 md:px-5 py-12">
          <div className="mb-6 flex items-center justify-center">
            <Image
              src="/images/casino/casino_title.webp"
              alt="casino title"
              width={200}
              height={200}
              className="h-10 w-auto md:h-12 object-contain"

            />
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {CASINO_GAMES.map((game) => (
              <GameCard
                key={game.id}
                image={game.image}
                title={game.title}
                logo={game.logo}
                onClick={() => handleCasinoPlay(game.vendorId)}
                disabled={isProcessing}
              />
            ))}
          </div>
        </section> */}
        {/* Slot */}
        {/* <section
          style={{ background: "url('/images/slot/slot_Bg.webp') 50% / cover no-repeat fixed", }}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-5 py-12">
            <div className="mb-6 flex items-center justify-center">
              <Image
                src="/images/slot/slot_title.webp"
                alt="casino title"
                width={200}
                height={200}
                className="h-10 w-auto md:h-12 object-contain"

              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {SLOT_GAMES.map((game) => (
                <GameCard
                  key={game.id}
                  image={game.image}
                  title={game.title}
                  logo={game.logo}
                  onClick={() => handleSlotVendorClick(game.vendorId)}
                  disabled={isProcessing}
                />
              ))}
            </div>
          </div>
        </section> */}
      </main >

      <Modal
        open={showSlotPopup}
        onClose={() => {
          setShowSlotPopup(false);
          setSlotSearchDraft("");
          setSlotSearchApplied("");
        }}
        title={
          <>
            <div className=" flex items-center gap-2">
              <BsGrid3X3GapFill className="size-5 text-white" />
              <p className="md:text-2xl text-lg font-bold text-white">{SLOT_GAMES.find(s => s.vendorId === slotVendorId)?.title || slotVendorId}</p>
            </div>
          </>

        }
        contentClassName="p-4"
        headerClassName="px-5 py-4 items-start justify-start"

      >

        <div className="mb-4 rounded-lg border-y border-[#e5e7eb] border-x-0 bg-white px-3 py-3 sm:border sm:border-[#e5e7eb] sm:rounded-lg">
          <div className="flex flex-wrap items-stretch gap-2">
            <div className="flex items-center">
              <Input
                placeholder="Search..."
                value={slotSearchDraft}
                onChange={(e) => setSlotSearchDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSlotSearchSubmit();
                  }
                }}
                rightIcon={
                  <>

                  </>
                }
                aria-label="게임 검색"
                containerClassName="min-w-0 flex-1 max-w-[250px]"
                className="h-9 text-sm border-r-0 rounded-r-none"
              />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="h-9 shrink-0 rounded-lg border-l-0 border-t border-r border-b border-[#22242626] px-4 text-sm font-semibold rounded-l-none"
                onClick={handleSlotSearchSubmit}
              >
                검색
              </Button>
            </div>

            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="size-9! shrink-0 rounded-lg p-0"
              onClick={refreshSlotGames}
              disabled={isLoadingSlotGames || !slotVendorId}
              aria-label="목록 새로고침"
              leftIcon={<HiArrowPath className="size-4 shrink-0" aria-hidden />}
            />
          </div>
        </div>

        {isLoadingSlotGames ? (
          <div className="py-12 text-center text-sm text-black/60">게임 목록을 불러오는 중...</div>
        ) : slotGames.length === 0 ? (
          <div className="py-12 text-center text-sm text-black/60">게임이 없습니다.</div>
        ) : filteredSlotGames.length === 0 ? (
          <div className="py-12 text-center text-sm text-black/60">검색 결과가 없습니다.</div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
            {filteredSlotGames.map((game) => (
              <div
                key={game.code}
                role="button"
                tabIndex={0}
                className={cn(
                  "group cursor-pointer overflow-hidden rounded-lg border-2 border-[#e5e5e5] bg-white",
                  "transition-colors duration-200 hover:border-[#ffd700]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd700]/60"
                )}
                onClick={() => handleSlotGameClick(game.code)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSlotGameClick(game.code);
                  }
                }}
              >
                <div className="relative w-full overflow-hidden">
                  {game.iconUrl && (
                    <Image
                      src={game.iconUrl}
                      alt={game.name}
                      width={200}
                      height={200}
                      className="aspect-square w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                      unoptimized
                    />
                  )}
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                    <Button
                      type="button"
                      variant="primary"
                      className="pointer-events-auto rounded-lg border-0 bg-[#00A89E] px-4 py-2 text-sm font-bold text-white shadow-md hover:bg-[#008f87] hover:brightness-105"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSlotGameClick(game.code);
                      }}
                    >
                      시작하기
                    </Button>
                  </div>
                </div>

                <div className="bg-white px-2 py-2 text-left text-sm font-medium leading-snug text-black">
                  <span className="line-clamp-2">{game.name || game.name_en}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal>

      {/* Slot Game Selection Popup */}
      {/* {showSlotPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => { setShowSlotPopup(false); setSlotGames([]); setSlotVendorId(null); }}>
          <div className="relative w-full max-w-2xl max-h-[80vh] mx-4 rounded-xl border border-[#e2b85666] bg-[#1a1a1a] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 bg-[radial-gradient(circle_at_top,#ffd2692e,#0000_58%)]">
              <div>
                <h2 className="text-lg font-bold text-[#f7e7ba]">게임 선택</h2>
                <p className="text-xs text-[#a88f61]">{SLOT_GAMES.find(s => s.vendorId === slotVendorId)?.title || slotVendorId}</p>
              </div>
              <button className="text-gray-400 hover:text-white text-xl" onClick={() => { setShowSlotPopup(false); setSlotGames([]); setSlotVendorId(null); }}>✕</button>
            </div>
            <div className="overflow-y-auto p-4 max-h-[calc(80vh-80px)] scrollbar">
              {isLoadingSlotGames ? (
                <div className="py-12 text-center text-gray-400">게임 목록을 불러오는 중...</div>
              ) : slotGames.length === 0 ? (
                <div className="py-12 text-center text-gray-400">게임이 없습니다.</div>
              ) : (
                <div className="grid grid-cols-3 gap-3 md:grid-cols-5 lg:grid-cols-6">
                  {slotGames.map((game) => (
                    <div
                      key={game.code}
                      onClick={() => handleSlotGameClick(game.code)}
                      className="cursor-pointer rounded-lg overflow-hidden border border-[#333] bg-black/50 transition-all duration-200 hover:scale-105 hover:border-[#ffd700] disabled:opacity-50"
                    >
                      {game.iconUrl && (
                        <Image
                          src={game.iconUrl}
                          alt={game.name}
                          width={200}
                          height={200}
                          className="w-full aspect-square object-cover"
                          unoptimized
                        />
                      )}
                      <div className="px-2 py-1.5 text-center text-[11px] text-white truncate">
                        {game.name || game.name_en}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )
      } */}

      <Footer />
    </>
  );
}
