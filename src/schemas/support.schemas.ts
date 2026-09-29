import z from "zod";

export const supportInquirySchema = z.object({
  title: z
    .string()
    .min(1, "제목을 입력하세요")
    .max(200, "제목은 200자 이하로 입력하세요"),
  content: z
    .string()
    .min(1, "내용을 입력하세요")
    .max(5000, "내용은 5000자 이하로 입력하세요"),
});

export type SupportInquiryFormValues = z.infer<typeof supportInquirySchema>;

export type SupportInquiryStatus = "pending" | "answered";

export type SupportInquiry = {
  id: string;
  title: string;
  content: string;
  status: SupportInquiryStatus;
  /** `toLocaleString("ko-KR")` 등으로 포맷된 표시용 문자열 */
  createdAt: string;
};

