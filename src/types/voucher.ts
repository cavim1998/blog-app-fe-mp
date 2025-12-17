import { EventTypes } from "./event";

export interface VoucherTypes {
  id: number;
  organizerId: number;
  eventId: number;
  event: EventTypes;
  code: string;
  discountAmount: number;
  startAt: string;
  endAt: string;
  usageLimit: number;
  usedCount: number;
}
