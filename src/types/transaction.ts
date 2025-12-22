import { EventTypes } from "./event";
import { UserTypes } from "./user";
import { VoucherTypes } from "./voucher";

export type TransactionStatus =
  | "WAITING_FOR_PAYMENT"
  | "WAITING_FOR_ADMIN_CONFIRMATION"
  | "DONE"
  | "REJECTED"
  | "EXPIRED"
  | "CANCELED";

export interface TransactionTypes {
  id: number;
  userId: number;
  user: UserTypes;
  eventId: number;
  event: EventTypes;
  ticketId: number;
  voucherId: number;
  voucher: VoucherTypes;
  quantity: number;
  totalPrice: number;
  status: TransactionStatus;
  paymentProofUrl: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  pointsUsed: number;
}
