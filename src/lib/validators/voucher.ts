import { z } from "zod";

export const voucherSchema = z
  .object({
    code: z
      .string()
      .min(3, { message: "Kode minimal 3 karakter" })
      .regex(/^[A-Z0-9]+$/, { message: "Hanya huruf besar dan angka" })
      .optional()
      .or(z.literal("")),
    eventId: z.string().min(1, { message: "Pilih event untuk voucher ini" }),
    amount: z.coerce.number().min(1, { message: "Nilai potongan wajib diisi" }),
    usageLimit: z.coerce.number().min(1, { message: "Minimal 1 penggunaan" }),
    startDate: z.string().refine((date) => new Date(date) > new Date(), {
      message: "Tanggal mulai harus di masa depan",
    }),
    endDate: z.string(),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "Tanggal selesai harus setelah tanggal mulai",
    path: ["endDate"],
  });

export type VoucherFormValues = z.infer<typeof voucherSchema>;
