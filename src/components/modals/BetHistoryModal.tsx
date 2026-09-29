"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { cn } from "@/utils/classNames";

export type BetHistoryModalProps = {
  open: boolean;
  onClose: () => void;
};

const TABS = [
  { key: "Live Casino", label: "카지노" },
  { key: "Slot", label: "슬롯" },
] as const;

export function BetHistoryModal({ open, onClose }: BetHistoryModalProps) {
  const [tab, setTab] = useState<string>("Live Casino");

  return (
    <Modal
      open={open}
      onClose={onClose}
      showCloseButton
      className="w-full max-w-3xl"
      contentClassName="!p-0 flex min-h-0 max-h-[min(80vh,760px)] flex-col"
      title="베팅내역"
    >
      <div className="min-h-0 flex-1 overflow-y-auto p-5 space-y-4">
        <div className="flex gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              className={cn(
                "rounded-full px-5 py-2 text-sm font-bold transition-colors",
                tab === t.key
                  ? "bg-[#3b527a] text-white shadow"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-170 text-sm">
              <thead>
                <tr className="bg-[#f5f6f8] text-gray-600">
                  <th className="px-3 py-2.5 text-left font-semibold">일시</th>
                  <th className="px-3 py-2.5 text-left font-semibold">업체</th>
                  <th className="px-3 py-2.5 text-left font-semibold">게임</th>
                  <th className="px-3 py-2.5 text-right font-semibold">베팅액</th>
                  <th className="px-3 py-2.5 text-right font-semibold">당첨액</th>
                  <th className="px-3 py-2.5 text-center font-semibold">결과</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6} className="py-10 text-center text-gray-400">
                    베팅내역이 없습니다.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Modal>
  );
}
