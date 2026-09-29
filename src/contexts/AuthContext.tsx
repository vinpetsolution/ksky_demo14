"use client";

import {
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
  ReactNode,
} from "react";
import { demoLogin } from "@/actions/demo-auth";
import { AUTH_TOKEN_KEY, AUTH_USER_KEY, DEMO_SESSION_TOKEN } from "@/constants/general";
import type { RegisterRequest } from "@/types/credential";

const SESSION_MARKER_KEY = "auth_session_active";

export interface User {
  id: string;
  userName: string;
  nickName?: string;
  phone: string;
  agentId: string;
  balancePoint: number;
  balancePot: number;
  balanceMoney: number;
  totaledPlay: number;
  bank_holder: string;
  bank_name: string;
  bank_no: string;
  role: string;
  status: string;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userName: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (data: RegisterRequest) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  refreshUserProfile: (userName?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const EMPTY_SESSION = { user: null as User | null, token: null as string | null };

type DemoSession = typeof EMPTY_SESSION;

let sessionSnapshot: DemoSession = EMPTY_SESSION;
let sessionInitialized = false;
const sessionListeners = new Set<() => void>();

function readPersistedSession(): DemoSession {
  try {
    const savedToken = localStorage.getItem(AUTH_TOKEN_KEY);
    const savedUser = localStorage.getItem(AUTH_USER_KEY);
    const sessionMarker = sessionStorage.getItem(SESSION_MARKER_KEY);

    if (savedToken && savedUser && sessionMarker) {
      return { token: savedToken, user: JSON.parse(savedUser) as User };
    }

    if (savedToken || savedUser) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    }
  } catch {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    sessionStorage.removeItem(SESSION_MARKER_KEY);
  }

  return EMPTY_SESSION;
}

function getClientSession(): DemoSession {
  if (!sessionInitialized) {
    sessionSnapshot = readPersistedSession();
    sessionInitialized = true;
  }
  return sessionSnapshot;
}

function subscribeSession(listener: () => void) {
  sessionListeners.add(listener);
  return () => {
    sessionListeners.delete(listener);
  };
}

function commitSession(next: DemoSession) {
  sessionSnapshot = next;
  sessionInitialized = true;
  sessionListeners.forEach((listener) => listener());
}

function createDemoUser(userName: string): User {
  return {
    id: "demo-user",
    userName,
    nickName: userName,
    phone: "",
    agentId: "demo",
    balancePoint: 0,
    balancePot: 0,
    balanceMoney: 0,
    totaledPlay: 0,
    bank_holder: "",
    bank_name: "",
    bank_no: "",
    role: "USER",
    status: "ACTIVE",
    createdAt: "2026-01-01T00:00:00.000Z",
  };
}

function noopSubscribe() {
  return () => { };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const isClient = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const session = useSyncExternalStore(subscribeSession, getClientSession, () => EMPTY_SESSION);

  const user = isClient ? session.user : null;
  const token = isClient ? session.token : null;

  const refreshUserProfile = useCallback(async () => {
    commitSession(readPersistedSession());
  }, []);

  const login = useCallback(
    async (userName: string, password: string): Promise<{ success: boolean; message: string }> => {
      try {
        const result = await demoLogin(userName, password);
        if (!result.success) {
          return result;
        }

        const demoUser = createDemoUser(userName);
        localStorage.setItem(AUTH_TOKEN_KEY, DEMO_SESSION_TOKEN);
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(demoUser));
        sessionStorage.setItem(SESSION_MARKER_KEY, "true");
        commitSession({ user: demoUser, token: DEMO_SESSION_TOKEN });
        return { success: true, message: "로그인 성공" };
      } catch {
        return { success: false, message: "잘못된 로그인 정보" };
      }
    },
    []
  );

  const register = useCallback(
    async (): Promise<{ success: boolean; message: string }> => {
      return {
        success: false,
        message: "데모 환경에서는 회원가입이 지원되지 않습니다.",
      };
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    sessionStorage.removeItem(SESSION_MARKER_KEY);
    commitSession(EMPTY_SESSION);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading: !isClient,
        login,
        register,
        logout,
        refreshUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
