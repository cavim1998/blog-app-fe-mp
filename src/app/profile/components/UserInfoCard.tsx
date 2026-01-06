"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { axiosInstance } from "@/lib/axios";

export default function UserInfoCard() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.userToken) {
      axiosInstance
        .get("/auth/me", {
          headers: {
            Authorization: `Bearer ${session.user.userToken}`,
          },
        })
        .then((res) => setUser(res.data))
        .catch((err) => {
          console.error("Failed to fetch user profile:", err);
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [session, status]);

  if (loading)
    return <div className="h-40 animate-pulse rounded-lg bg-white p-4" />;
  if (!user) return null;

  return (
    <div className="space-y-3 rounded-lg border bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6">
      <h2 className="text-base font-bold sm:text-lg">My Account</h2>

      <div>
        <p className="text-xs text-gray-500 sm:text-sm">Name</p>
        <p className="text-sm font-semibold sm:text-base">{user.name}</p>
      </div>

      <div>
        <p className="text-xs text-gray-500 sm:text-sm">Email</p>
        <p className="text-sm font-semibold break-all sm:text-base">
          {user.email}
        </p>
      </div>

      <div>
        <p className="text-xs text-gray-500 sm:text-sm">Points</p>
        <p className="text-sm font-semibold sm:text-base">
          {user.pointsBalance} pts
        </p>
      </div>
    </div>
  );
}
