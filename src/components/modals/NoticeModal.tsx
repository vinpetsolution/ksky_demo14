"use client";

import { Fragment, useCallback, useState } from "react";
import Modal from "@/components/ui/Modal";
import { cn } from "@/utils/classNames";
import { NOTICE_LIST } from "@/data/notices";

export type NoticeModalProps = {
  open: boolean;
  onClose: () => void;
};

export function NoticeModal({ open, onClose }: NoticeModalProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleRow = useCallback((id: string) => {
    setExpandedId((cur) => (cur === id ? null : id));
  }, []);

  const handleClose = useCallback(() => {
    setExpandedId(null);
    onClose();
  }, [onClose]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      showCloseButton
      className="w-full border-[#e2b85666]"
      contentClassName="!p-0 flex min-h-0 flex-col"
      headerClassName="px-5 py-4 items-start justify-start"
      title="공지사항"
    >
      <div className="p-5">
        <div className="overflow-hidden rounded-xl border border-[#22242626] bg-white">
          {NOTICE_LIST.length === 0 ? (
            <div className="py-8 text-center text-black/60">공지사항이 없습니다.</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="hidden w-full min-w-150 text-sm md:table">
                  <thead>
                    <tr className="bg-white text-black">
                      <th className="w-17.5 px-3 py-2 text-center">No.</th>
                      <th className="px-3 py-2 text-left">제목</th>
                      <th className="w-35 px-3 py-2 text-center">작성일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {NOTICE_LIST.map((row) => {
                      const isOpen = expandedId === row.id;
                      return (
                        <Fragment key={row.id}>
                          <tr
                            role="button"
                            tabIndex={0}
                            onClick={() => toggleRow(row.id)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                toggleRow(row.id);
                              }
                            }}
                            className={cn(
                              "cursor-pointer border-t border-[#22242626] transition",
                              isOpen ? "bg-black/20" : "hover:bg-white/3"
                            )}
                          >
                            <td className="px-3 py-3 text-center text-black/60">
                              {row.no}
                            </td>
                            <td className="px-3 py-3 text-left">
                              <div className="flex items-center justify-between gap-3">
                                <div className="font-semibold text-black">
                                  {row.title}
                                </div>
                                <span className="text-xs text-black/60">
                                  {isOpen ? "닫기" : "보기"}
                                </span>
                              </div>
                            </td>
                            <td className="px-3 py-3 text-center text-black/60">
                              {row.date}
                            </td>
                          </tr>
                          {isOpen ? (
                            <tr
                              className="border-t border-[#22242626] bg-white"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <td colSpan={3} className="px-4 py-4">
                                <div className="text-sm text-black leading-relaxed">
                                  {row.content}
                                </div>
                              </td>
                            </tr>
                          ) : null}
                        </Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <ul className="md:hidden min-w-75">
                {NOTICE_LIST.map((row) => {
                  const isOpen = expandedId === row.id;
                  return (
                    <li key={row.id} className="border-t border-[#22242626] first:border-t-0">
                      <button
                        type="button"
                        onClick={() => toggleRow(row.id)}
                        className="flex w-full items-start justify-between gap-2 px-3 py-3 text-left transition hover:bg-[#22242626]"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-black/60">No. {row.no}</span>
                            <p className="text-xs text-black/60">{row.date}</p>
                          </div>
                          <div className="mt-0.5 text-sm font-medium text-black">
                            {row.title}
                          </div>
                        </div>
                        <span className="shrink-0 text-xs text-black/60">
                          {isOpen ? "닫기" : "보기"}
                        </span>
                      </button>
                      {isOpen ? (
                        <div className="border-t border-[#22242626] bg-white px-4 py-4">
                          <div className="text-sm text-black leading-relaxed">
                            {row.content}
                          </div>
                        </div>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
