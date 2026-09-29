"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { formatNumber } from "@/utils/format";
import { useAuth } from "@/contexts/AuthContext";

export type WithdrawModalProps = {
  open: boolean;
  onClose: () => void;
};

const PRESET_AMOUNTS = [30_000, 50_000, 100_000, 300_000, 500_000, 1_000_000] as const;
const PRESET_LABELS = ["3만원", "5만원", "10만원", "30만원", "50만원", "100만원"] as const;

const PRECAUTIONS = [
  "출금 전 등록된 계좌, 예금주, 은행명을 꼭 확인하시길 바랍니다.",
  "출금은 30,000 이상이며, 만원 단위로 신청 가능합니다.",
  "잦은 출금 요청 시 출금에 제한이 될 수 있습니다.",
  "입금후 바로 환전은 불가하며, 최소 100% 롤링 후 출금 가능합니다.",
  "출금은 등록된 계좌로만 가능하며, 타명의 이체 요청은 허용되지 않습니다.",
] as const;

const rowBorder = "border-b border-[#22242626]";
export function WithdrawModal({ open, onClose }: WithdrawModalProps) {
  const { user } = useAuth();
  const [amount, setAmount] = useState(0);
  const [amountInput, setAmountInput] = useState("");
  const [withdrawPassword, setWithdrawPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePresetClick = (value: number) => {
    const next = amount + value;
    setAmount(next);
    setAmountInput(String(next));
  };

  const handleReset = () => {
    setAmount(0);
    setAmountInput("");
  };

  const handleSubmit = async () => {
    if (!user || amount < 30000 || isSubmitting) return;
    if (!withdrawPassword) {
      alert("환전 비밀번호를 입력해주세요.");
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    alert("출금 신청이 완료되었습니다.");
    handleReset();
    setWithdrawPassword("");
    setIsSubmitting(false);
  };

  const bankName = user?.bank_name || "-";
  const bankNo = user?.bank_no || "-";
  const bankHolder = user?.bank_holder || "-";

  return (
    <Modal
      open={open}
      onClose={onClose}
      showCloseButton
      className="w-full border-[#e2b85666]"
      contentClassName="!p-0 flex min-h-0 max-h-[min(88vh,860px)] flex-col"
      headerClassName="px-5 py-4 items-start justify-start"
      title="출금요청"
      positionFooter="start"
      footer={
        <>
          <Button type="button" variant="primary" className="rounded-lg text-sm font-bold" onClick={handleSubmit} disabled={isSubmitting || amount < 30000}>
            {isSubmitting ? "처리중..." : "출금신청"}
          </Button>
          <Button type="button" variant="secondary" className="rounded-lg text-sm font-bold" onClick={onClose}>
            취소
          </Button>
        </>
      }
    >
      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-5 scrollbar">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="border border-[#22242626] rounded-xl bg-white overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                <tr className={rowBorder}>
                  <td className="w-32.5 border-r border-[#22242626] bg-white px-4 py-3 text-black">출금정보</td>
                  <td className="px-4 py-3 text-left text-black font-bold">
                    은행명 [{bankName}], 계좌번호 [{bankNo}], 예금주 [{bankHolder}]
                  </td>
                </tr>
                <tr className={rowBorder}>
                  <td className="w-32.5 border-r border-[#22242626] bg-white px-4 py-3 text-black">보유금액</td>
                  <td className="px-4 py-3 text-left text-black font-bold">
                    {formatNumber(user?.balanceMoney ?? 0)}원
                  </td>
                </tr>
                <tr className={rowBorder}>
                  <td className="w-32.5 border-r border-[#22242626] bg-white px-4 py-3 text-black">환전비번</td>
                  <td className="px-4 py-3 text-left font-bold">
                    <Input
                      placeholder="가입 시 기재한 환전 비밀번호 입력"
                      type="password"
                      value={withdrawPassword}
                      onChange={(e) => setWithdrawPassword(e.target.value)}
                      className="h-11 text-sm max-w-md"
                      aria-label="환전비밀번호"
                    />
                  </td>
                </tr>
                <tr className={rowBorder}>
                  <td className="w-32.5 border-r border-[#22242626] bg-white px-4 py-3 text-black">출금금액</td>
                  <td className="px-4 py-3 text-left font-bold">
                    <Input
                      placeholder="출금금액을 입력하세요"
                      type="text"
                      value={amount === 0 ? "" : formatNumber(Number(amountInput))}
                      onChange={(e) => {
                        const v = e.target.value.replace(/[^0-9]/g, "");
                        setAmountInput(v);
                        setAmount(v ? Number(v) : 0);
                      }}
                      className="h-11 text-sm max-w-md text-right"
                      inputMode="decimal"
                      aria-label="출금금액"
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      {PRESET_AMOUNTS.map((n, i) => (
                        <Button key={n} type="button" variant="secondary" className=" px-3 py-1.5 text-xs font-bold" onClick={() => handlePresetClick(n)}>
                          {PRESET_LABELS[i]}
                        </Button>
                      ))}
                      <Button type="button" variant="transparent" className="px-3 py-1.5 text-xs font-bold bg-white text-black/60 hover:text-black/80 border border-black/60 hover:border-black/80" onClick={handleReset}>
                        금액정정
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>

        <div className="border border-[#22242626] rounded-xl bg-white text-sm text-black p-4">
          <h3 className="mb-3 text-lg font-bold text-[#10a3a3]">환전시 주의사항</h3>
          <ul className="list-inside list-disc leading-relaxed">
            {PRECAUTIONS.map((line) => (
              <li key={line} className="pl-0.5">{line}</li>
            ))}
          </ul>
        </div>

        <div className="border border-[#22242626] rounded-xl bg-white overflow-hidden">
          <div className="border-b border-[#22242626] px-4 py-3 text-lg font-bold text-[#10a3a3]">출금내역</div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-175 text-sm">
              <thead>
                <tr className="bg-white text-black">
                  <th className="px-3 py-2 text-left">신청일시</th>
                  <th className="px-3 py-2 text-right">금액</th>
                  <th className="px-3 py-2 text-center">상태</th>
                  <th className="px-3 py-2 text-left">처리일시</th>
                  <th className="px-3 py-2 text-left">비고</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-[#22242626] text-black/60">
                  <td colSpan={5} className="px-3 py-4 text-center">출금내역이 없습니다.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Modal>
  );
}
