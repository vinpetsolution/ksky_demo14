"use client";

import { useCallback, useState } from "react";
import Modal from "@/components/ui/Modal";
import { cn } from "@/utils/classNames";
import { INBOX_MESSAGE_SEED, type InboxMessage } from "@/data/inboxMessages";

export type MessageModalProps = {
  open: boolean;
  onClose: () => void;
};

export function MessageModal({ open, onClose }: MessageModalProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = INBOX_MESSAGE_SEED.find((item) => item.id === selectedId) ?? null;

  const handleSelect = useCallback((message: InboxMessage) => {
    setSelectedId(message.id);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedId(null);
    onClose();
  }, [onClose]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      showCloseButton
      className="w-full border-[#e2b85666]"
      contentClassName="!p-0 flex flex-col min-h-0 flex-1 overflow-y-auto"
      headerClassName="px-5 py-4 items-start justify-start"
      title="쪽지함"
    >
      <div className="p-5 min-w-[95vw] md:min-w-md lg:min-w-auto lg:max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-w-75">
          <div className="flex h-150 min-h-0 flex-col overflow-hidden rounded-xl border border-[#22242626] bg-white p-4 md:col-span-1">
            <h2 className="shrink-0 border-b border-[#22242626] bg-white pb-2 text-xl font-semibold text-black">
              받은 쪽지
            </h2>
            {INBOX_MESSAGE_SEED.length === 0 ? (
              <p className="flex flex-1 items-center justify-center text-center text-sm text-black/60">
                받은 쪽지가 없습니다.
              </p>
            ) : (
              <div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-2 scrollbar">
                {INBOX_MESSAGE_SEED.map((thread) => {
                  const isActive = selectedId === thread.id;
                  return (
                    <div
                      key={thread.id}
                      className={cn(
                        "p-3 rounded cursor-pointer transition-colors",
                        isActive
                          ? "border border-[#10a3a3] bg-[#10a3a3]/10"
                          : "border border-[#22242626] bg-white hover:bg-[#f0f0f0]"
                      )}
                      onClick={() => handleSelect(thread)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleSelect(thread);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="mb-1 flex items-start justify-between">
                        <span className="truncate pr-2 text-sm font-medium text-black">
                          {thread.title}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-black/60">
                        <span>{thread.receivedAt}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="bg-white border border-[#22242626] rounded-xl md:col-span-2 flex h-150 flex-col p-6">
            {!selected ? (
              <div className="h-full flex flex-1 items-center justify-center text-black/60">
                쪽지를 선택해주세요.
              </div>
            ) : (
              <>
                <div className="mb-4 border-b border-[#22242626] pb-4">
                  <h2 className="text-2xl font-bold mb-2">{selected.title}</h2>
                  <div className="flex items-center text-sm text-black/60">
                    <span>받은시간: {selected.receivedAt}</span>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto space-y-3 text-black leading-relaxed">
                  {selected.body}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
