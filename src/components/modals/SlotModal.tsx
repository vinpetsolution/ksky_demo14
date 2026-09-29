"use client";

import { useState } from "react";
import Image from "next/image";
import GameCard from "@/components/ui/GameCard";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { SLOT_GAMES } from "@/constants";
import { useGameLauncher } from "@/hooks/useGameLauncher";
import { cn } from "@/utils/classNames";
import { DEMO_SLOT_GAMES } from "@/data/slotGames";
import type { GameCardItem } from "@/constants/game-card-item";

export type SlotModalProps = {
  open: boolean;
  onClose: () => void;
};

export function SlotModal({ open, onClose }: SlotModalProps) {
  const { launchSlotGame, isProcessing } = useGameLauncher();
  const [selectedVendor, setSelectedVendor] = useState<GameCardItem | null>(null);

  const handleVendorClick = (game: GameCardItem) => {
    if (!game.vendorId || isProcessing) return;
    setSelectedVendor(game);
  };

  const handleGameClick = async (gameCode: string) => {
    if (!selectedVendor?.vendorId || isProcessing) return;
    await launchSlotGame(selectedVendor.vendorId, gameCode);
  };

  const handleBack = () => {
    setSelectedVendor(null);
  };

  const handleClose = () => {
    setSelectedVendor(null);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      showCloseButton
      className="w-full max-w-5xl border-[#e2b85666]"
      contentClassName="!p-0 flex min-h-0 max-h-[min(88vh,860px)] flex-col"
      headerClassName="px-5 py-4 items-start justify-start bg-[radial-gradient(circle_at_top,#ffd2692e,#0000_58%)]"
      title={
        <>
          <div className="w-full flex flex-col gap-1">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-[#d4b168]">
              VIPGAMEKING SLOT
            </p>
            <h2 className="text-xl font-bold text-[#f7e7ba]">
              {selectedVendor ? selectedVendor.title : "슬롯"}
            </h2>
            <p className="text-xs text-[#a88f61]">
              {selectedVendor
                ? "원하는 게임을 선택하면 바로 플레이할 수 있습니다."
                : "원하는 슬롯 게임사를 선택하고 바로 게임 목록으로 이동하세요."}
            </p>
          </div>
        </>
      }
    >
      {!selectedVendor ? (
        <div className="grid grid-cols-2 p-5 gap-3 md:grid-cols-4 lg:grid-cols-6 min-h-0 flex-1 overflow-y-auto scrollbar">
          {SLOT_GAMES.map((game) => (
            <GameCard
              key={game.id}
              image={game.image}
              title={game.title}
              logo={game.logo}
              onClick={() => handleVendorClick(game)}
              disabled={isProcessing}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col min-h-0 flex-1">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-[#caa24a40]">
            <Button
              variant="secondary"
              onClick={handleBack}
              className="h-8 rounded-lg text-xs font-bold px-4"
            >
              ← 뒤로
            </Button>
            <span className="text-sm text-[#a88f61]">
              {DEMO_SLOT_GAMES.length}개 게임
            </span>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar p-4">
            <div className="grid grid-cols-3 gap-3 md:grid-cols-5 lg:grid-cols-6">
              {DEMO_SLOT_GAMES.map((game) => (
                <div
                  key={game.code}
                  onClick={() => handleGameClick(game.code)}
                  className={cn(
                    "cursor-pointer rounded-lg overflow-hidden border border-[#333] bg-black/50",
                    "transition-all duration-200 hover:scale-105 hover:border-[#ffd700]",
                    isProcessing && "opacity-50 pointer-events-none"
                  )}
                >
                  {game.iconUrl && (
                    <Image
                      src={game.iconUrl}
                      alt={game.name}
                      width={200}
                      height={200}
                      className="w-full aspect-square object-cover"
                    />
                  )}
                  <div className="px-2 py-1.5 text-center text-[11px] text-white truncate">
                    {game.name || game.name_en}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
