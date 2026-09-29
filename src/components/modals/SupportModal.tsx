"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import Modal from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import {
  type SupportInquiryFormValues,
  supportInquirySchema,
} from "@/schemas/support.schemas";
import { cn } from "@/utils/classNames";
import { useAuth } from "@/contexts/AuthContext";
import type { QnA } from "@/types/qna";

const STATUS_LABEL: Record<string, string> = {
  pending: "답변대기",
  answered: "답변완료",
  closed: "종료",
};

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleString("ko-KR");
  } catch {
    return dateStr;
  }
}

export type SupportModalProps = {
  open: boolean;
  onClose: () => void;
};

export function SupportModal({ open, onClose }: SupportModalProps) {
  const { user } = useAuth();
  const [inquiries, setInquiries] = useState<QnA[]>([]);
  const [viewing, setViewing] = useState<QnA | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SupportInquiryFormValues>({
    resolver: zodResolver(supportInquirySchema),
    defaultValues: { title: "", content: "" },
  });

  const handleModalClose = useCallback(() => {
    setViewing(null);
    reset({ title: "", content: "" });
    onClose();
  }, [onClose, reset]);

  const handleView = useCallback((qna: QnA) => {
    setViewing(qna);
    setInquiries((prev) =>
      prev.map((item) =>
        item.id === qna.id ? { ...item, isRead: true } : item,
      ),
    );
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (!user) return;
    setInquiries((prev) => {
      const created: QnA = {
        id: `demo-qna-${prev.length + 1}`,
        title: data.title.trim(),
        message: data.content.trim(),
        status: "pending",
        userId: user.id,
        userName: user.userName,
        createdAt: "",
        updatedAt: "",
        isRead: true,
      };
      return [created, ...prev];
    });
    reset();
  });

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      showCloseButton
      className="w-full border-[#e2b85666] lg:min-w-lg"
      contentClassName="p-5 overflow-y-auto scrollbar"
      headerClassName="px-5 py-4 items-start justify-start"
      title="고객센터"
    >
      <>
        <div className="p-6 mb-8 rounded-xl bg-white border border-[#22242626]">
          <h2 className="mb-4 text-xl font-semibold text-black">문의 작성</h2>
          <form className="space-y-4" onSubmit={onSubmit} noValidate>
            <Input
              label="제목"
              placeholder="제목을 입력하세요"
              fullWidth
              error={errors.title?.message}
              autoComplete="off"
              {...register("title")}
            />
            <Textarea
              label="내용"
              placeholder="내용을 입력하세요"
              fullWidth
              rows={5}
              resize="vertical"
              className="min-h-25 max-h-50"
              error={errors.content?.message}
              {...register("content")}
            />
            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={isSubmitting}
              className="rounded-lg text-sm font-bold"
            >
              등록하기
            </Button>
          </form>
        </div>

        {viewing ? (
          <div className="mb-4 rounded-xl border border-[#22242626] bg-white p-4 text-left">
            <div className="mb-2 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-black/60">제목</p>
                <p className="text-sm font-semibold text-black">
                  {viewing.title}
                </p>
              </div>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setViewing(null)}
                className="shrink-0"
              >
                닫기
              </Button>
            </div>
            <p className="text-xs text-black/60">내용</p>
            <p className="mt-1 whitespace-pre-wrap text-sm text-black">
              {viewing.message}
            </p>
            {viewing.answer && (
              <div className="mt-4 border-t border-[#22242626] pt-3">
                <p className="text-xs text-black/60">답변</p>
                <p className="mt-1 whitespace-pre-wrap text-sm text-black">
                  {viewing.answer}
                </p>
                {viewing.answeredAt && (
                  <p className="mt-1 text-xs text-black/60">
                    답변일 {formatDate(viewing.answeredAt)}
                  </p>
                )}
              </div>
            )}
            <p className="mt-3 text-xs text-black/60">
              작성일 {formatDate(viewing.createdAt)}
            </p>
          </div>
        ) : null}

        <div className="rounded-xl bg-white border border-[#22242626] overflow-hidden w-full">
          <div className="overflow-x-auto w-full">
            <table className="text-sm w-175">
              <thead>
                <tr className="bg-white text-black">
                  <th className="hidden w-17.5 px-3 py-2 text-center sm:table-cell">
                    No.
                  </th>
                  <th className="px-3 py-2 text-left min-w-0">제목</th>
                  <th className="w-27.5 px-3 py-2 text-center">상태</th>
                  <th className="w-42.5 px-3 py-2 text-center">작성일</th>
                  <th className="w-22.5 px-3 py-2 text-center">보기</th>
                </tr>
              </thead>
              <tbody className="text-black">
                {inquiries.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-black/60">
                      문의가 없습니다.
                    </td>
                  </tr>
                ) : (
                  inquiries.map((row, index) => (
                    <tr
                      key={row.id}
                      className="border-t border-[#22242626] text-black"
                    >
                      <td className="hidden px-3 py-2 text-center sm:table-cell">
                        {inquiries.length - index}
                      </td>
                      <td
                        className="px-3 py-2 truncate max-w-0"
                        title={row.title}
                      >
                        {!row.isRead && (
                          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#10a3a3]" />
                        )}
                        {row.title}
                      </td>
                      <td className="px-3 py-2 text-center">
                        <span
                          className={cn(
                            "inline-block rounded px-1.5 py-0.5 text-xs font-medium",
                            row.status === "answered"
                              ? "bg-[#10a3a3]/10 text-black"
                              : "bg-[#22242626] text-black/60",
                          )}
                        >
                          {STATUS_LABEL[row.status] || row.status}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-center text-xs">
                        {formatDate(row.createdAt)}
                      </td>
                      <td className="px-3 py-2 text-center">
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => handleView(row)}
                          className="h-7 min-w-0 px-2 text-xs"
                        >
                          보기
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </>
    </Modal>
  );
}
