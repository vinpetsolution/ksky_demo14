"use client";

import { useCallback, useState } from "react";
import { DEMO_GAME_NOTICE } from "@/constants/general";

export function useGameLauncher() {
  const [isProcessing, setIsProcessing] = useState(false);

  const showDemoNotice = useCallback(() => {
    alert(DEMO_GAME_NOTICE);
  }, []);

  const launchCasinoGame = useCallback(async (vendorId?: string): Promise<boolean> => {
    void vendorId;
    if (isProcessing) return false;
    setIsProcessing(true);
    showDemoNotice();
    setIsProcessing(false);
    return false;
  }, [isProcessing, showDemoNotice]);

  const launchSlotGame = useCallback(async (vendorId?: string, gameCode?: string): Promise<boolean> => {
    void vendorId;
    void gameCode;
    if (isProcessing) return false;
    setIsProcessing(true);
    showDemoNotice();
    setIsProcessing(false);
    return false;
  }, [isProcessing, showDemoNotice]);

  const launchRoyalCasino = useCallback(async (): Promise<boolean> => {
    if (isProcessing) return false;
    setIsProcessing(true);
    showDemoNotice();
    setIsProcessing(false);
    return false;
  }, [isProcessing, showDemoNotice]);

  return {
    isProcessing,
    isPopupOpen: false,
    launchCasinoGame,
    launchRoyalCasino,
    launchSlotGame,
  };
}
