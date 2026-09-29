"use client";

import Modal from "@/components/ui/Modal";
import { Input } from "../ui/Input";
import { useCallback, useState } from "react";
import { formatNumber } from "@/utils/format";
import { cn } from "@/utils/classNames";
import { Button } from "../ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import type { TransactionListItem } from "@/types/transaction";

export type ConvertModalProps = {
  open: boolean;
  onClose: () => void;
};

const PRESET_ADD: { key: string; label: string; add: number | "full" }[] = [
  { key: "10k", label: "1만", add: 10_000 },
  { key: "50k", label: "5만", add: 50_000 },
  { key: "100k", label: "10만", add: 100_000 },
  { key: "full", label: "전액", add: "full" },
];

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleString("ko-KR");
  } catch {
    return dateStr;
  }
}

function formatWon(n: number) {
  return `${n.toLocaleString("ko-KR")}원`;
}

export function ConvertModal({ open, onClose }: ConvertModalProps) {
  const { user } = useAuth();
  const [amount, setAmount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history: TransactionListItem[] = [];

  const rollingMax = user?.balancePoint ?? 0;
  const balanceMoney = user?.balanceMoney ?? 0;

  const clampToRolling = useCallback(
    (n: number) => Math.max(0, Math.min(rollingMax, n)),
    [rollingMax]
  );

  const handlePreset = (add: number | "full") => {
    if (add === "full") {
      setAmount(rollingMax);
      return;
    }
    setAmount(clampToRolling(amount + add));
  };

  const handleSubmit = async () => {
    if (!user || amount <= 0 || isSubmitting) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    alert("전환에 실패했습니다.");
    setIsSubmitting(false);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      showCloseButton
      className="w-full border-[#e2b85666]"
      contentClassName="!p-0 flex min-h-0 max-h-[min(88vh,860px)] flex-col"
      headerClassName="shrink-0 px-5 py-4 items-start justify-start bg-[radial-gradient(circle_at_top,#ffd2692e,#0000_58%)]"
      title={
        <>
          <div className="w-full flex flex-col gap-1">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-[#d4b168]">
              VIPGAMEKING CONVERT
            </p>
            <h2 className="text-xl font-bold text-[#f7e7ba]">롤링 전환</h2>
            <p className="text-xs text-[#a88f61]">
              롤링 포인트를 보유머니로 안전하게 전환할 수 있습니다.
            </p>
          </div>
        </>
      }
    >
      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-5 scrollbar">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-[#caa24a33] bg-black/30 px-3 py-3">
            <p className="text-[11px] text-[#9f8657]">보유머니</p>
            <p className="mt-1 text-base font-extrabold text-[#f6d488] md:text-lg">
              {formatNumber(balanceMoney)}원
            </p>
          </div>
          <div className="rounded-xl border border-[#caa24a33] bg-black/30 px-3 py-3">
            <p className="text-[11px] text-[#9f8657]">롤링 포인트</p>
            <p className="mt-1 text-base font-extrabold text-[#f6d488] md:text-lg">
              {formatNumber(rollingMax)}P
            </p>
          </div>
        </div>

        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div>
            <label className="mb-2 block text-xs font-semibold tracking-[0.08em] text-[#c8a66b]">
              전환 타입
            </label>
            <div className="rounded-lg border border-[#f0c365] bg-[linear-gradient(180deg,#f5d18b,#cc9838)] px-3 py-2 text-sm font-bold text-[#2b1905] shadow-[0_8px_18px_#e8ad4659]">
              롤링
              <span className="ml-1 text-xs text-[#3d2708]">
                {formatNumber(rollingMax)}P
              </span>
            </div>
            <p className="mt-2 text-xs text-[#96805a]">
              전환 가능 금액: {formatNumber(rollingMax)}P
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Input
              placeholder="0"
              type="text"
              inputMode="numeric"
              labelClassName="text-[#c8a66b] font-semibold text-xs"
              label="전환 금액"
              value={amount === 0 ? "" : formatNumber(amount)}
              onChange={(e) => {
                const v = e.target.value.replace(/[^0-9]/g, "");
                if (!v) {
                  setAmount(0);
                  return;
                }
                setAmount(clampToRolling(Number(v)));
              }}
              rightIcon={
                <span className="text-sm font-bold text-[#ad8d55]">P</span>
              }
              className={cn(
                "h-12 w-full px-4 py-2 pr-10 text-right text-sm",
                "border-[#caa24a47] text-lg focus:ring-[#e9bb5d]/30 placeholder:text-[#796645]",
                "font-extrabold placeholder:font-extrabold text-[#ffe5af] bg-black/40"
              )}
              fullWidth
              aria-label="전환 금액"
            />
            <div className="grid grid-cols-4 gap-2">
              {PRESET_ADD.map(({ key, label, add }) => (
                <Button
                  key={key}
                  type="button"
                  variant="transparent"
                  className={cn(
                    "h-auto border px-2 py-1.5 text-xs font-semibold",
                    add === "full"
                      ? "border-[#f0c36573] bg-[#caa24a22] text-[#f4dca8] hover:border-[#f0c36573] hover:bg-[#caa24a40] hover:text-[#f1d6a4]"
                      : "border-[#caa24a38] bg-black/25 text-[#d9b97f] hover:border-[#f0c36573] hover:text-[#f1d6a4]"
                  )}
                  onClick={() => handlePreset(add)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
          <Button
            type="submit"
            className="w-full rounded-xl text-[15px] font-extrabold"
            disabled={isSubmitting || amount <= 0}
          >
            {isSubmitting ? "처리중..." : "전환 신청"}
          </Button>
        </form>

        <div className="rounded-xl border border-[#caa24a33] bg-black/25 px-4 py-3 text-xs text-[#a89267]">
          <ul className="list-inside list-disc">
            <li>전환된 금액은 즉시 보유머니로 적립됩니다.</li>
            <li>최근 전환 내역은 최대 10건까지 확인할 수 있습니다.</li>
          </ul>
        </div>

        <div className="rounded-xl border border-[#caa24a33] bg-black/25 px-4 py-3 text-xs text-[#a89267]">
          <h3 className="mb-3 text-sm font-bold text-[#f1dab0]">전환 내역</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-160 text-xs">
              <thead>
                <tr className="border-b border-[#caa24a2e] text-[#b79c68]">
                  <th className="px-3 py-2 text-left">일시</th>
                  <th className="px-3 py-2 text-left">구분</th>
                  <th className="px-3 py-2 text-right">금액</th>
                  <th className="px-3 py-2 text-center">상태</th>
                  <th className="px-3 py-2 text-left">비고</th>
                </tr>
              </thead>
              <tbody>
                {history.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-3 py-4 text-center text-[#807060]">
                      전환 내역이 없습니다.
                    </td>
                  </tr>
                ) : (
                  history.map((row) => (
                    <tr key={row.id} className="border-b border-[#caa24a14] text-[#e7d3a1]">
                      <td className="px-3 py-2 text-left text-[#90774c]">
                        {formatDate(row.createdAt)}
                      </td>
                      <td className="px-3 py-2 text-left">{row.type}</td>
                      <td className="px-3 py-2 text-right font-bold text-[#d8a85f]">
                        {formatWon(row.amount)}
                      </td>
                      <td className="px-3 py-2 text-center">{row.status}</td>
                      <td className="px-3 py-2 text-left text-[#90774c]">
                        {row.note || "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Modal>
  );
}
