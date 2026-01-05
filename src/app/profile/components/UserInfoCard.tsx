"use client"
import { useEffect, useState } from "react"
import { getProfile } from "@/lib/auth"

export default function UserInfoCard() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    getProfile().then(setUser)
  }, [])

  if (!user) return null

  return (
    <div className="bg-white rounded-lg sm:rounded-2xl border p-4 sm:p-6 shadow-sm space-y-3">
      <h2 className="text-base sm:text-lg font-bold">My Account</h2>

      <div>
        <p className="text-xs sm:text-sm text-gray-500">Name</p>
        <p className="font-semibold text-sm sm:text-base">{user.name}</p>
      </div>

      <div>
        <p className="text-xs sm:text-sm text-gray-500">Email</p>
        <p className="font-semibold text-sm sm:text-base break-all">{user.email}</p>
      </div>

      <div>
        <p className="text-xs sm:text-sm text-gray-500">Points</p>
        <p className="font-semibold text-sm sm:text-base">{user.pointsBalance} pts</p>
      </div>
    </div>
  )
}
