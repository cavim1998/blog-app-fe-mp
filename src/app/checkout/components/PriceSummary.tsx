"use client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useTransactionStore } from "@/stores/transaction"

export default function PriceSummary() {
  const tx = useTransactionStore(s => s.tx)
  const setPaying = useTransactionStore(s => s.setPaying)
  const router = useRouter()
  if (!tx) return null

  const payNow = () => {
    setPaying(true)

    setTimeout(() => {
      toast.success("Payment success. You can check it in your history.")
      router.push("/")
    }, 5000)
  }

  return (
    <div className="border rounded-lg sm:rounded-2xl p-3 sm:p-4 md:p-6 bg-white shadow-lg space-y-3 sm:space-y-4">
      <p className="font-semibold text-sm sm:text-base">Detail Price</p>

      <div className="flex justify-between text-xs sm:text-sm">
        <span>Total ticket price</span>
        <span>Rp {tx.price.toLocaleString("id-ID")}</span>
      </div>

      <hr />

      <div className="flex justify-between font-bold text-blue-500 text-sm sm:text-base md:text-lg">
        <span>Total</span>
        <span>Rp {tx.price.toLocaleString("id-ID")}</span>
      </div>

      <button
        onClick={payNow}
        className="bg-blue-500 hover:bg-blue-400 text-white px-4 sm:px-6 py-2 rounded-lg sm:rounded-xl w-full text-sm sm:text-base font-medium"
      >
        Pay
      </button>
    </div>
  )
}
