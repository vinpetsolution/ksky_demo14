"use client";

import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { useModal } from "@/contexts/ModalContext";
import { formatNumber } from "@/utils/format";
import { MdCloudDownload, MdCloudUpload } from "react-icons/md";
import { HiArrowPath } from "react-icons/hi2";
import { useCallback, useState } from "react";

export type UserInfoModalProps = {
  open: boolean;
  onClose: () => void;
};

/** User từ API có thể có thêm các trường không khai báo trong User type. */
type UserDisplay = ReturnType<typeof useAuth>["user"] & {
  nickName?: string;
  createdAt?: string;
};

function formatJoinDate(iso?: string) {
  if (!iso || iso.trim() === "") return "-";
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  } catch {
    return iso;
  }
}

const labelCell =
  "w-[34%] min-w-[132px] max-w-[180px] border-r border-[#22242626] bg-white px-3 py-3 text-sm font-medium text-black align-middle md:min-w-[160px]";
const rowBorder = "border-b border-[#22242626]";
const contentCell = "bg-white px-3 py-3 align-middle md:px-4";

export default function UserInfoModal({ open, onClose }: UserInfoModalProps) {
  const { user, refreshUserProfile } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false)

  const { openProtectedModal } = useModal();
  const u = user as UserDisplay | null;

  const nickname = u?.nickName?.trim();
  const memberDisplay =
    u?.userName && nickname ? `${u.userName} (${nickname})` : u?.userName ?? "-";

  const handleRefresh = useCallback(async () => {
    if (isRefreshing) return
    setIsRefreshing(true)
    try {
      await refreshUserProfile()
    } finally {
      setIsRefreshing(false)
    }
  }, [isRefreshing, refreshUserProfile])

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="회원정보"
      className="w-full min-w-[90vw] max-w-xl md:min-w-160"
      contentClassName="min-h-0 scrollbar p-6"
    >
      <>
        <div className="text-[#10a3a3] mb-3 border border-[#10a3a3] bg-[#e1f7f7] w-full rounded-lg p-4 text-sm">
          {`${user?.userName || ""} 님 반갑습니다.`}
        </div>
        <div className="overflow-hidden rounded-lg border border-[#e5e7eb]">
          <table className="w-full table-fixed border-collapse text-sm">
            <tbody>
              {/* 회원아이디 */}
              <tr className={rowBorder}>
                <td className={labelCell}>회원아이디 (닉네임)</td>
                <td className={contentCell}>
                  <div className="inline-flex max-w-full bg-white px-3 py-2 text-[13px] font-semibold text-gray-900 md:text-sm">
                    {memberDisplay}
                  </div>
                </td>
              </tr>

              {/* 보유캐시 */}
              <tr className={rowBorder}>
                <td className={labelCell}>보유캐시</td>
                <td className={contentCell}>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                    <div className="inline-flex shrink-0 items-baseline gap-1 rounded-md border border-[#0d9488] bg-white px-3 py-2 text-[#0d9488] shadow-[inset_0_0_0_1px_rgba(13,148,136,0.25)]">
                      <span className="text-sm w-full min-w-25 font-bold tabular-nums">
                        {formatNumber(user?.balanceMoney ?? 0)}
                      </span>
                      <span className="text-xs shrink-0 font-semibold text-[#0d9488]/90">캐시</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        variant="primary"
                        size="sm"
                        leftIcon={<MdCloudDownload className="size-4 shrink-0" aria-hidden />}
                        onClick={() => openProtectedModal("deposit")}
                      >
                        충전
                      </Button>
                      <Button
                        type="button"
                        variant="transparent"
                        size="sm"
                        leftIcon={<MdCloudUpload className="size-4 shrink-0" aria-hidden />}
                        className="bg-[#21ba45] hover:bg-[#21ba45]/80 hover:text-white text-white"
                        onClick={() => openProtectedModal("withdraw")}
                      >
                        출금
                      </Button>
                    </div>
                  </div>
                </td>
              </tr>

              {/* 포인트 */}
              <tr className={rowBorder}>
                <td className={labelCell}>포인트</td>
                <td className={contentCell}>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                    <div className="inline-flex shrink-0 items-baseline gap-1 rounded-md border border-[#f59e0b] bg-white px-3 py-2 text-[#f59e0b] shadow-[inset_0_0_0_1px_rgba(245,158,11,0.35)]">
                      <span className="text-sm w-full min-w-25 font-bold tabular-nums">
                        {formatNumber(user?.balancePoint ?? 0)}
                      </span>
                      <span className="text-xs shrink-0 font-semibold text-[#d97706]">포인트</span>
                    </div>
                    <Button
                      type="button"
                      variant="transparent"
                      size="sm"
                      leftIcon={<HiArrowPath className="size-4 shrink-0" aria-hidden />}
                      className="bg-[#fbbd08] hover:bg-[#fbbd08]/80 hover:text-white text-white"
                      onClick={handleRefresh}
                    >
                      캐시로 전환
                    </Button>
                  </div>
                </td>
              </tr>

              {/* 계좌정보 */}
              <tr className={rowBorder}>
                <td className={labelCell}>계좌정보</td>
                <td className={`${contentCell} p-0`}>
                  <div className="divide-y divide-[#e5e7eb]">
                    <div className="flex items-center gap-3 px-3 py-2.5 md:px-4">
                      <span className="min-w-10 rounded border border-[#22242626] bg-white px-2 py-1 text-center text-sm text-black">
                        예금주
                      </span>
                      <span className="break-all text-sm font-medium text-black">
                        {user?.bank_holder?.trim() || "-"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2.5 md:px-4">
                      <span className="min-w-10 rounded border border-[#22242626] bg-white px-2 py-1 text-center text-sm text-black">
                        계좌번호
                      </span>
                      <span
                        className={`break-all text-sm font-medium tabular-nums ${user?.bank_no ? "text-black" : "text-gray-400"
                          }`}
                      >
                        {user?.bank_no?.trim() ? user.bank_no : "0000"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2.5 md:px-4">
                      <span className="min-w-10 rounded border border-[#22242626] bg-white px-2 py-1 text-center text-sm text-black">
                        계좌은행
                      </span>
                      <span className="break-all text-sm font-medium text-black">
                        {user?.bank_name?.trim() || "-"}
                      </span>
                    </div>
                  </div>
                </td>
              </tr>

              {/* 가입일 */}
              <tr>
                <td className={`${labelCell} border-b-0`}>가입일</td>
                <td className={`${contentCell} border-b-0 text-sm text-black md:text-sm`}>
                  {formatJoinDate(u?.createdAt)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    </Modal>
  );
}
