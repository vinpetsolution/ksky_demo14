"use client";

import GameCard from "@/components/ui/GameCard";
import Modal from "@/components/ui/Modal";
import { CASINO_GAMES } from "@/constants/casino";
import { useGameLauncher } from "@/hooks/useGameLauncher";

export type CasinoModalProps = {
  open: boolean;
  onClose: () => void;
};


export function CasinoModal({ open, onClose }: CasinoModalProps) {
  const { launchCasinoGame, isProcessing } = useGameLauncher();

  const handlePlay = async (vendorId?: string) => {
    if (!vendorId || isProcessing) return;
    await launchCasinoGame(vendorId);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      showCloseButton
      className="w-full max-w-5xl border-[#e2b85666]"
      contentClassName="!p-0 flex min-h-0 max-h-[min(88vh,860px)] flex-col"
      headerClassName="px-5 py-4 items-start justify-start bg-[radial-gradient(circle_at_top,#ffd2692e,#0000_58%)]"
      title={
        <>
          <div className="w-full flex flex-col gap-1">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-[#d4b168]">
              VIPGAMEKING
            </p>
            <h2 className="text-xl font-bold text-[#f7e7ba]">카지노</h2>
            <p className="text-xs text-[#a88f61]">
              원하는 카지노 게임사를 선택해 바로 입장할 수 있습니다.
            </p>
          </div>
        </>
      }
    >
      <div className="grid grid-cols-2 p-5 gap-3 md:grid-cols-4 lg:grid-cols-4 min-h-0 flex-1 overflow-y-auto scrollbar">
        {CASINO_GAMES.map((game) => (
          <GameCard
            key={game.id}
            image={game.image}
            title={game.title}
            logo={game.logo}
            onClick={() => handlePlay(game.vendorId)}
            disabled={isProcessing}
          />
        ))}
      </div>
    </Modal>
  );
}
