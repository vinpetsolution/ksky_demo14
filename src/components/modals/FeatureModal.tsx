"use client";

import Modal from "@/components/ui/Modal";

export type FeatureModalProps = {
  open: boolean;
  onClose: () => void;
  /** Tiêu đề modal (từ `MODAL_TITLES` ở provider) */
  title: string;
};

export function FeatureModal({ open, onClose, title }: FeatureModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      contentClassName="min-h-0"
    >
      <p className="p-5 text-sm text-[#c9b99a]">
        {title} 콘텐츠를 이 영역에 구성할 수 있습니다.
      </p>
    </Modal>
  );
}
