/**
 * Cấu trúc mỗi thẻ game dùng chung cho Casino / Slot (và `GameCard`).
 */
export type GameCardItem = {
  id: string;
  image: string;
  title: string;
  logo: string;
  vendorId?: string;
};
