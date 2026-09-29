"use client";

import { type ReactNode } from "react";
import { NoticeProse } from "@/components/ui/NoticeProse";

export type NoticeListItem = {
  /** Khóa mở rộng (ví dụ theo số No. hoặc slug) */
  id: string;
  no: number;
  title: string;
  date: string;
  author: string;
  /** Nội dung khi mở rộng: chỉnh sửa ở đây hoặc tách component riêng bên dưới */
  content: ReactNode;
};

/* -------------------------------------------------------------------------- */
/* Tách từng nội dung dài ra component riêng nếu cần bảo trì từng bài        */
/* -------------------------------------------------------------------------- */

function NoticeContentNo3() {
  return (
    <NoticeProse>
      <h2>
        <strong>카지노</strong>
      </h2>
      <p>[배팅한도]</p>
      <p>1000만 (사이드포함)</p>
      <p>[당첨한도]</p>
      <p>2000만 (사이드포함)</p>
      <p>에볼루션 이벤트성 게임(라이트닝,풍성한 등등)은</p>
      <p>당첨금 2천만원(2,000만원)까지 인정하며</p>
      <p>
        그 외에 금액은 <strong>*자동 회수*</strong> 처리되는 점 참고 바랍니다.
      </p>
      <p>
        <strong>(자사 카지노롤링 기준 100%)</strong>
      </p>
      <h2>
        <strong>슬롯</strong>
      </h2>
      <p>1회 5만원 (스핀구매 최대 500만원)</p>
      <p>5만원 초과 배팅시</p>
      <p>보유금액 전액 회수 처리 됩니다.</p>
      <p>최대 당첨금은 5000만원 까지 인정 됩니다.</p>
      <p>5000만원 이상 당첨시</p>
      <p>5000만원 이상의 금액은 회수처리 됩니다.</p>
      <p>위 규정을 숙지하셔서 불이익 받는 일 없이 이용 부탁 드립니다.</p>
    </NoticeProse>
  );
}

function NoticeContentNo2() {
  return (
    <NoticeProse>
      <p>-카지노 입금액 올인배팅하는 행위</p>
      <p>-카지노 양방, 멀티배팅 작업 배팅하는 행위</p>
      <p>-3회 이상 입금액롤링만 채우고 출금하는 행위</p>
      <p>-동일 아이피 및 동일기기 접속 확인 시 대리 배팅으로 간주</p>
      <p>-지인 혹은 타인에게 계정양도 (대리배팅)</p>
      <p>-게임사에서 악성배팅으로 답변 및 확정된 회원</p>
      <p>-프로그램사용, 사이트해킹등으로 비정상적인 방식으로 배팅한 회원</p>
    </NoticeProse>
  );
}

function NoticeContentNo1() {
  return (
    <NoticeProse>
      <h2>
        <strong>{'<'}충전{'>'}</strong>
      </h2>
      <p>-입금 전 반드시 계좌문의 후 입금해야되며,</p>
      <p>구 계좌 입금시 절대 처리 불가능 합니다.</p>
      <p>-항상 선 입금 후 충전해 주시기 바랍니다.</p>
      <p>-최소 3만원 이상 만원단위로 충전 가능 합니다.</p>
      <p>-수표 불가능합니다.</p>
      <p>-3자입금 금지 / 본인명의 계좌로만 입금/출금 가능 </p>
      <h2>
        <strong>{'<'}환전{'>'}</strong>
      </h2>
      <p>-환전한도</p>
      <p>1회 최대환전 한도 : 무제한 (고액출금시 나누어서 환전진행)</p>
      <p>1일 최대환전 한도 : 무제한 (고액출금시 나누어서 환전진행)</p>
      <p>
        -1회 환전후 재환전 대기시간은 (2시간) /{" "}
        <strong>(특이사항은 고객센터로 문의바랍니다.)</strong>
      </p>
      <p>-은행점검 시간중 신청하실 경우 취소 처리됩니다.</p>
    </NoticeProse>
  );
}

/**
 * Thứ tự: No.3 → 2 → 1 (trùng bảng giao diện).
 * Thêm/sửa bài: bổ sung `NoticeListItem` hoặc component nội dung ở trên.
 */
export const NOTICE_LIST: readonly NoticeListItem[] = [
  {
    id: "notice-3",
    no: 3,
    title: "배팅한도 및 당첨한도",
    date: "3/10/2016",
    author: "운영팀",
    content: <NoticeContentNo3 />,
  },
  {
    id: "notice-2",
    no: 2,
    title: "금지사항",
    date: "3/10/2016",
    author: "운영팀",
    content: <NoticeContentNo2 />,
  },
  {
    id: "notice-1",
    no: 1,
    title: "충전/환전 규정",
    date: "3/10/2016",
    author: "운영팀",
    content: <NoticeContentNo1 />,
  },
];
