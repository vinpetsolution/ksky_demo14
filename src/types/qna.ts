export interface QnA {
  id: string;
  title: string;
  message: string;
  status: "pending" | "answered" | "closed";
  answer?: string | null;
  userId: string;
  userName: string;
  answeredBy?: string | null;
  answeredByName?: string | null;
  createdAt: string;
  updatedAt: string;
  answeredAt?: string | null;
  isRead?: boolean;
}
