/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAuth } from "@/contexts/AuthContext";
import { LoginModal } from "@/components/modals/LoginModal";
import { MessageModal } from "@/components/modals/MessageModal";
import { NoticeModal } from "@/components/modals/NoticeModal";
import { RegisterModal } from "@/components/modals/RegisterModal";
import { SupportModal } from "@/components/modals/SupportModal";
import { DepositModal } from "@/components/modals/DepositModal";
import { WithdrawModal } from "@/components/modals/WithdrawModal";
import { ConvertModal } from "@/components/modals/ConvertModal";
import UserInfoModal from "@/components/modals/UserInfoModal";
import { BetHistoryModal } from "@/components/modals/BetHistoryModal";

const PROTECTED_MODAL_IDS = [
  "deposit",
  "withdraw",
  "notice",
  "support",
  "messages",
  "convert",
  "info",
  "bethistory",
] as const;

export type ProtectedModalId = (typeof PROTECTED_MODAL_IDS)[number];
export type AuthModalId = "login" | "register";
export type AppModalId = ProtectedModalId | AuthModalId;

function isAuthModalId(id: AppModalId): id is AuthModalId {
  return id === "login" || id === "register";
}

function isProtectedModalId(id: AppModalId): id is ProtectedModalId {
  return PROTECTED_MODAL_IDS.includes(id as ProtectedModalId);
}

type ModalContextValue = {
  activeModal: AppModalId | null;
  isAuthenticated: boolean;
  openModal: (id: AppModalId) => void;
  closeModal: () => void;
  openProtectedModal: (id: ProtectedModalId) => void;
  requireAuth: (onAuthed: () => void) => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, login, register } = useAuth();
  const [activeModal, setActiveModal] = useState<AppModalId | null>(null);
  const isAuthenticatedRef = useRef(false);
  const afterAuthActionRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    isAuthenticatedRef.current = isAuthenticated;
    if (isAuthenticated) {
      const run = afterAuthActionRef.current;
      afterAuthActionRef.current = null;
      if (run) {
        run();
      }
    }
  }, [isAuthenticated]);

  const closeModal = useCallback(() => {
    if (activeModal === "login" && !isAuthenticated) {
      afterAuthActionRef.current = null;
    }
    setActiveModal(null);
  }, [activeModal, isAuthenticated]);

  const openModal = useCallback((id: AppModalId) => {
    if (isAuthModalId(id)) {
      setActiveModal(id);
      return;
    }
    if (isProtectedModalId(id)) {
      if (!isAuthenticatedRef.current) {
        setActiveModal("login");
        return;
      }
      setActiveModal(id);
    }
  }, []);

  const openProtectedModal = useCallback(
    (id: ProtectedModalId) => {
      openModal(id);
    },
    [openModal]
  );

  const requireAuth = useCallback(
    (onAuthed: () => void) => {
      if (isAuthenticated) {
        onAuthed();
        return;
      }
      afterAuthActionRef.current = onAuthed;
      setActiveModal("login");
    },
    [isAuthenticated]
  );

  const handleLoginSuccess = useCallback(async (userName: string, password: string) => {
    const result = await login(userName, password);
    if (result.success) {
      closeModal();
    }
    return result;
  }, [login, closeModal]);

  const handleRegisterSuccess = useCallback(async (data: any) => {
    const result = await register(data);
    if (result.success) {
      setActiveModal("login");
    }
    return result;
  }, [register]);

  const value = useMemo<ModalContextValue>(
    () => ({
      activeModal,
      isAuthenticated,
      openModal,
      closeModal,
      openProtectedModal,
      requireAuth,
    }),
    [activeModal, isAuthenticated, openModal, closeModal, openProtectedModal, requireAuth]
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      <LoginModal
        open={activeModal === "login"}
        onClose={closeModal}
        onLoginSuccess={handleLoginSuccess}
        onRequestRegister={() => {
          setActiveModal("register");
        }}
      />
      <RegisterModal
        open={activeModal === "register"}
        onClose={closeModal}
        onRegisterSuccess={handleRegisterSuccess}
        onRequestLogin={() => {
          setActiveModal("login");
        }}
      />
      <UserInfoModal
        open={activeModal === "info"}
        onClose={closeModal}
      />
      <DepositModal
        open={activeModal === "deposit"}
        onClose={closeModal}
      />
      <WithdrawModal
        open={activeModal === "withdraw"}
        onClose={closeModal}
      />
      <NoticeModal
        open={activeModal === "notice"}
        onClose={closeModal}
      />
      <SupportModal
        open={activeModal === "support"}
        onClose={closeModal}
      />
      <MessageModal
        open={activeModal === "messages"}
        onClose={closeModal}
      />
      <ConvertModal
        open={activeModal === "convert"}
        onClose={closeModal}
      />
      <BetHistoryModal
        open={activeModal === "bethistory"}
        onClose={closeModal}
      />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return ctx;
}
export { PROTECTED_MODAL_IDS };
