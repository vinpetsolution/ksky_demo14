import z from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "아이디를 입력하세요"),
  password: z.string().min(1, "비밀번호를 입력하세요"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    username: z.string().min(1, "아이디를 입력하세요"),
    password: z.string().min(1, "비밀번호를 입력하세요"),
    confirmPassword: z.string().min(1, "비밀번호를 재입력하세요"),
    nickname: z.string().min(1, "닉네임을 입력하세요"),
    phoneCarrier: z.string().min(1, "통신사를 선택하세요"),
    phoneMiddle: z.string().min(3, "중간번호 3~4자리").max(4, "중간번호 3~4자리").regex(/^\d+$/, "숫자만 입력"),
    phoneLast: z.string().length(4, "마지막번호 4자리").regex(/^\d+$/, "숫자만 입력"),
    bankCode: z.string().min(1, "은행을 선택하세요"),
    accountHolder: z.string().min(1, "예금주 성명을 입력하세요"),
    accountNumber: z.string().min(1, "계좌번호를 입력하세요").regex(/^\d+$/, "숫자만 입력"),
    transactionPassword: z.string().min(3, "출금 비밀번호 3자 이상").max(20, "출금 비밀번호 20자 이하").regex(/^[a-zA-Z0-9]+$/, "영문/숫자만 입력"),
    referralCode: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;