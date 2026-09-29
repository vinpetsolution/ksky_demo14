"use server";

import { timingSafeEqual } from "node:crypto";

export type DemoLoginResult = {
  success: boolean;
  message: string;
};

function timingSafeStringEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);

  if (aBuf.length !== bBuf.length) {
    const dummy = Buffer.alloc(aBuf.length);
    if (aBuf.length > 0) {
      timingSafeEqual(aBuf, dummy);
    }
    return false;
  }

  return timingSafeEqual(aBuf, bBuf);
}

export async function demoLogin(
  username: string,
  password: string
): Promise<DemoLoginResult> {
  const expectedUser = process.env.DEMO_USERNAME ?? "";
  const expectedPass = process.env.DEMO_PASSWORD ?? "";

  if (!expectedUser || !expectedPass) {
    return { success: false, message: "잘못된 로그인 정보" };
  }

  const userOk = timingSafeStringEqual(username, expectedUser);
  const passOk = timingSafeStringEqual(password, expectedPass);

  if (userOk && passOk) {
    return { success: true, message: "로그인 성공" };
  }

  return { success: false, message: "잘못된 로그인 정보" };
}
