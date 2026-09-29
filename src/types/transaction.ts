export interface TransactionListItem {
  id: string;
  userId: string;
  amount: number;
  type: "Deposit" | "Withdrawal" | "Transfer";
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  note: string;
  createdAt: string;
  updatedAt: string;
}
