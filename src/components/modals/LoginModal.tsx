"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import Modal from "@/components/ui/Modal";
import { LoginFormValues, loginSchema } from "@/schemas/auth.schemas";
import { useState } from "react";


export type LoginModalProps = {
  open: boolean;
  onClose: () => void;
  onLoginSuccess: (userName: string, password: string) => Promise<{ success: boolean; message: string }>;
  onRequestRegister: () => void;
};

export function LoginModal({
  open,
  onClose,
  onLoginSuccess,
}: LoginModalProps) {

  const [error, setError] = useState<string | null>("");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = handleSubmit(async (data) => {
    setError(null);
    const result = await onLoginSuccess(data.username, data.password);
    if (result.success) {
      reset();
    } else {
      setError(result.message);
    }
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="로그인"
      className="w-full min-w-[90vw] md:min-w-md lg:min-w-md"
      contentClassName="min-h-0 scrollbar"
      positionFooter="start"
      footer={
        <>
          <Button
            type="submit"
            form="login-modal-form"
            variant="primary"
            loading={isSubmitting}
            className="rounded-md text-base font-bold h-12"
          >
            로그인하기
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="rounded-md text-base font-bold h-12"
          >
            취소
          </Button>
        </>
      }
    >
      <form
        id="login-modal-form"
        onSubmit={onSubmit}
        className="flex flex-col px-5 pt-3 pb-5 space-y-4"
        noValidate
      >
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            label={<>아이디<span className="text-red-500">*</span></>}
            placeholder="접속ID"
            autoComplete="username"
            fullWidth
            className="text-base h-12"
            {...register("username")}
          />
          <PasswordInput
            label={<>비밀번호<span className="text-red-500">*</span></>}
            placeholder="비밀번호"
            autoComplete="current-password"
            fullWidth
            className="text-base h-12"
            {...register("password")}
          />
        </div>
        {error && (
          <div className="pt-1 text-center text-sm font-medium text-red-400">
            {error}
          </div>
        )}
      </form>
    </Modal>
  );
}
