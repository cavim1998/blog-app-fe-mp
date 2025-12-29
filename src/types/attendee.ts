import { TransactionTypes } from "./transaction";
import { UserTypes } from "./user";

export interface AttendeeTypes {
  id: number;
  ticketCode: string;
  isCheckedIn: boolean;
  checkedInAt: string;
  eventId: number;
  event: Event;
  userId: number;
  user: UserTypes;
  transactionId: number;
  transaction: TransactionTypes;
  ticketId: number;
}
