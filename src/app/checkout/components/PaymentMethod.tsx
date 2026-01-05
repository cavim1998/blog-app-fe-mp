"use client"
import { useTransactionStore } from "@/stores/transaction"
import QRCode from "react-qr-code"

export default function PaymentMethod() {
  const tx = useTransactionStore(s => s.tx)
  if (!tx) return null

  return (
    <div className="bg-white rounded-lg sm:rounded-xl border p-3 sm:p-4 shadow-sm space-y-3 sm:space-y-4">
      <h3 className="font-semibold text-sm sm:text-base">QRIS</h3>

      <div className="flex justify-center">
        <QRCode
          value={`PAY|TRX-${tx.id}|TOTAL-${tx.price}`}
          size={160}
        />
      </div>

      <p className="text-xs sm:text-sm text-gray-500 text-center">
        Scan this QR with any E-Wallet to pay
      </p>
    </div>
  )
}
