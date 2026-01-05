"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { FaTicketAlt, FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user as any;
  const isOrganizer = user?.role === "organizer";
  const isLogin = status === "authenticated";

  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/login" });
  };

  return (
    <div className="border-b-2 bg-white sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 text-xl font-bold">
          <FaTicketAlt className="text-3xl" /> LOKET<span>CO</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2">
          {isOrganizer && (
            <Link href="/dashboard">
              <Button className="rounded-full border bg-white text-black hover:bg-gray-100">
                Dashboard
              </Button>
            </Link>
          )}

          {!isLogin ? (
            <>
              <Link href="/login">
                <Button className="rounded-full border bg-white text-black hover:bg-gray-100">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="rounded-full border bg-white text-black hover:bg-gray-100">
                  Register
                </Button>
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push("/profile")}
                className="rounded-full border px-4 py-2 hover:bg-slate-100"
              >
                Profile
              </button>
              <Button
                onClick={handleLogout}
                className="rounded-full bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </Button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t bg-white px-4 py-4 space-y-3">

          {isOrganizer && (
            <Link href="/dashboard" onClick={() => setOpen(false)}>
              <div className="w-full rounded-full border px-4 py-2 hover:bg-gray-100">
                Dashboard
              </div>
            </Link>
          )}

          {!isLogin ? (
            <>
              <Link href="/login" onClick={() => setOpen(false)}>
                <div className="w-full rounded-lg border px-4 py-2 hover:bg-gray-100">
                  Login
                </div>
              </Link>
              <Link href="/register" onClick={() => setOpen(false)}>
                <div className="w-full rounded-lg border px-4 py-2 hover:bg-gray-100">
                  Register
                </div>
              </Link>
            </>
          ) : (
            <>
              <div
                onClick={() => {
                  router.push("/profile");
                  setOpen(false);
                }}
                className="w-full rounded-full border px-4 py-2 hover:bg-gray-100 cursor-pointer mt-3"
              >
                Profile
              </div>

              <button
                onClick={handleLogout}
                className="w-full rounded-full bg-red-500 py-2 text-white hover:bg-red-600 mt-2"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;