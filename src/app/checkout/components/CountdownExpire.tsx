"use client"
import { useTransactionStore } from "@/stores/transaction"
import { useEffect, useState } from "react"

export default function CountdownExpire() {
    const tx = useTransactionStore(s => s.tx)
    const [left, setLeft] = useState(0)

    useEffect(() => {
        if (!tx?.expiresAt) return
        const t = setInterval(() => {
            setLeft(new Date(tx.expiresAt).getTime() - Date.now())
        }, 1000)
        return () => clearInterval(t)
    }, [tx?.expiresAt])

    if (left <= 0) return null

    return (
        <div className="bg-yellow-400 text-black px-3 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-xs sm:text-sm">
            <span>⏰ Your order will expire in</span>
            <b className="text-sm sm:text-base font-bold">{Math.floor(left / 60000)}:{Math.floor((left % 60000) / 1000).toString().padStart(2, "0")}</b>
        </div>
    )
}
