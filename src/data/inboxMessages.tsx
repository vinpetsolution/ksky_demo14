"use client";

import { type ReactNode } from "react";
import { NoticeProse } from "@/components/ui/NoticeProse";

export type InboxMessage = {
  id: string;
  title: string;
  date: string;
  receivedAt: string;
  body: ReactNode;
};

function BodyDepositNotice() {
  return (
    <NoticeProse>
      <p>안녕하세요. 운영진입니다.</p>
      <p>현재 확인된 입금 내역이 없어</p>
      <p>
        회원님께서 접수하신<strong>입금 신청 건은 취소 처리</strong>된 점 안내드립니다.
      </p>
      <p>
        입금 신청은 반드시<strong>실제 입금 진행 후</strong>접수해 주셔야
      </p>
      <p>정상적으로 확인 및 처리가 가능한 점 참고 부탁드립니다.</p>
      <p>
        <strong>이용 순서 안내</strong>
      </p>
      <p>계좌 확인 → 입금 진행 → 입금 신청</p>
      <p>보다 원활한 이용을 위해 위 절차에 맞게 이용해 주시기 바랍니다.</p>
      <p>감사합니다.</p>
    </NoticeProse>
  );
}

function BodyEventNotice() {
  return (
    <NoticeProse>
      <p>
        이번 주말 <strong>슬롯 캐시백 5%</strong> 이벤트가 진행됩니다.
      </p>
      <p>지급 시점: 월요일 18시 일괄 지급 (롤링 조건 충족 시)</p>
      <p>자세한 내용은 이벤트 공지를 확인해 주세요.</p>
    </NoticeProse>
  );
}

function BodyMaintenance() {
  return (
    <NoticeProse>
      <p>
        04/30 02:00~04:00 은행 점검에 따라 <strong>입·출금</strong>이 잠시 지연될 수 있습니다.
      </p>
      <p>이용에 참고 부탁드립니다.</p>
    </NoticeProse>
  );
}

export const INBOX_MESSAGE_SEED: InboxMessage[] = [
  {
    id: "msg-1",
    title: "<선 입금 신청 처리 안내>",
    date: "4/24/2026",
    receivedAt: "4/24/2026, 10:34:48 PM",
    body: <BodyDepositNotice />,
  },
  {
    id: "msg-2",
    title: "<주말 슬롯 캐시백 이벤트>",
    date: "4/23/2026",
    receivedAt: "4/23/2026, 3:10:00 PM",
    body: <BodyEventNotice />,
  },
  {
    id: "msg-3",
    title: "<은행 점검 안내>",
    date: "4/20/2026",
    receivedAt: "4/20/2026, 9:00:00 AM",
    body: <BodyMaintenance />,
  },
  {
    id: "msg-4",
    title: "<은행 점검 안내>",
    date: "4/20/2026",
    receivedAt: "4/20/2026, 9:00:00 AM",
    body: <BodyMaintenance />,
  },
  {
    id: "msg-5",
    title: "<은행 점검 안내>",
    date: "4/20/2026",
    receivedAt: "4/20/2026, 9:00:00 AM",
    body: <BodyMaintenance />,
  },
  {
    id: "msg-6",
    title: "<은행 점검 안내>",
    date: "4/20/2026",
    receivedAt: "4/20/2026, 9:00:00 AM",
    body: <BodyMaintenance />,
  },
  {
    id: "msg-7",
    title: "<은행 점검 안내>",
    date: "4/20/2026",
    receivedAt: "4/20/2026, 9:00:00 AM",
    body: <BodyMaintenance />,
  },
  {
    id: "msg-8",
    title: "<은행 점검 안내>",
    date: "4/20/2026",
    receivedAt: "4/20/2026, 9:00:00 AM",
    body: <BodyMaintenance />,
  },
];
