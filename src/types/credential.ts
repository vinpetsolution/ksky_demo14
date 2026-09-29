export interface RegisterRequest {
  userName: string;
  nickName?: string;
  password: string;
  phone: string;
  agentId: string;
  role: "USER";
  bankHolder: string;
  bankName: string;
  bankNo: string;
  transactionPassword: string;
}
