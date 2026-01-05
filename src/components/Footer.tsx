import Link from "next/link";
import { FaTwitter, FaFacebookF, FaInstagram, FaTicketAlt } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-white border-t-2">
            <div className="container mx-auto px-4 py-10">

                {/* Logo */}
                <h2 className="text-xl sm:text-2xl font-bold flex items-center justify-center gap-2 mb-6">
                    <FaTicketAlt className="text-2xl sm:text-3xl" />
                    LOKET<span>CO</span>
                </h2>

                {/* Navigation */}
                <nav className="
                    grid grid-cols-2 sm:flex
                    justify-center
                    gap-x-6 gap-y-4
                    text-xs sm:text-sm
                    uppercase tracking-widest
                    mb-8
                ">
                    {["Home", "About", "Blog", "Contact", "Terms", "Privacy"].map((item) => (
                        <Link
                            key={item}
                            href="#"
                            className="hover:underline underline-offset-4 decoration-2 transition text-center"
                        >
                            {item}
                        </Link>
                    ))}
                </nav>

                {/* Social icons */}
                <div className="flex justify-center gap-4 sm:gap-6 mb-8">
                    <Social icon={<FaTwitter />} />
                    <Social icon={<FaFacebookF />} />
                    <Social icon={<FaInstagram />} />
                </div>

                {/* Copyright */}
                <p className="text-[10px] sm:text-xs text-gray-500 text-center">
                    Copyright ©{new Date().getFullYear()} All rights reserved by loketco.com
                </p>
            </div>
        </footer>
    );
}

function Social({ icon }: { icon: React.ReactNode }) {
    return (
        <a
            href="#"
            className="
                w-9 h-9 sm:w-10 sm:h-10
                rounded-full border border-blue-500
                flex items-center justify-center
                text-blue-500
                hover:bg-blue-500 hover:text-black
                transition
            "
        >
            {icon}
        </a>
    );
}
