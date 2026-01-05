"use client"
import { useEffect, useMemo, useState } from "react"
import { useTransactionStore } from "@/stores/transaction"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"

const PAGE_SIZE = 5

export default function HistoryList() {
    const fetchMyHistory = useTransactionStore(s => s.fetchMyHistory)
    const [all, setAll] = useState<any[]>([])
    const [filter, setFilter] = useState<"ALL" | string>("ALL")
    const [start, setStart] = useState(0)

    useEffect(() => {
        fetchMyHistory().then(setAll)
    }, [fetchMyHistory])

    const filtered = useMemo(() => {
        if (filter === "ALL") return all
        return all.filter(t => t.status === filter)
    }, [all, filter])

    const canUp = start > 0
    const canDown = start + PAGE_SIZE < filtered.length

    const windowed = useMemo(
        () => filtered.slice(start, start + PAGE_SIZE),
        [filtered, start]
    )

    return (
        <div className="space-y-3 sm:space-y-4">
            <h2 className="text-base sm:text-lg font-bold">My Orders</h2>

            <div className="flex flex-wrap gap-1 sm:gap-2 pb-2 md:pb-3">
                {["ALL", "PAID", "WAITING_FOR_PAYMENT", "WAITING_FOR_ADMIN_CONFIRMATION", "REJECTED", "EXPIRED", "CANCELED"].map(s => (
                    <button
                        key={s}
                        onClick={() => { setFilter(s); setStart(0) }}
                        className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold border
                        ${filter === s ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100"}`}
                    >
                        {s.replaceAll("_", " ")}
                    </button>
                ))}
            </div>


            {windowed.map(trx => (
                <div key={trx.id} className="border rounded-lg sm:rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
                    <div className="flex-1">
                        <p className="font-semibold text-sm sm:text-base">{trx.event?.title}</p>
                        <p className="text-xs text-gray-500">
                            {new Date(trx.createdAt).toLocaleString("id-ID")}
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="font-bold text-blue-500 text-sm sm:text-base">
                            Rp {trx.price.toLocaleString("id-ID")}
                        </p>
                        <span className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-semibold
              ${trx.status === "PAID" ? "bg-green-100 text-green-600" :
                                trx.status === "WAITING_FOR_ADMIN_CONFIRMATION" ? "bg-blue-100 text-blue-600" :
                                    trx.status === "WAITING_FOR_PAYMENT" ? "bg-yellow-100 text-yellow-700" :
                                        trx.status === "REJECTED" ? "bg-red-100 text-red-600" :
                                            trx.status === "EXPIRED" ? "bg-gray-200 text-gray-600" :
                                                "bg-slate-200 text-slate-600"}`}>
                            {trx.status.replaceAll("_", " ")}
                        </span>
                    </div>
                </div>
            ))}

            {/* CHEVRON SLIDER */}
            {all.length > PAGE_SIZE && (
                <div className="flex justify-center gap-4 sm:gap-6 pt-3 sm:pt-4">
                    <button
                        disabled={!canUp}
                        onClick={() => setStart(s => Math.max(0, s - PAGE_SIZE))}
                        className={`p-2 rounded-full border text-sm sm:text-base ${canUp ? "hover:bg-gray-100" : "opacity-40 cursor-not-allowed"}`}
                    >
                        <FaChevronUp />
                    </button>

                    <button
                        disabled={!canDown}
                        onClick={() => setStart(s => s + PAGE_SIZE)}
                        className={`p-2 rounded-full border text-sm sm:text-base ${canDown ? "hover:bg-gray-100" : "opacity-40 cursor-not-allowed"}`}
                    >
                        <FaChevronDown />
                    </button>
                </div>
            )}
        </div>
    )
}
