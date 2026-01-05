import Link from "next/link";
import {
  Music,
  PartyPopper,
  Palette,
  Flag,
  Briefcase,
  Film,
} from "lucide-react";

const categories = [
  { name: "Music", icon: Music },
  { name: "Nightlife", icon: PartyPopper },
  { name: "Arts", icon: Palette },
  { name: "Racing", icon: Flag },
  { name: "Business", icon: Briefcase },
  { name: "Movies", icon: Film },
];

export default function SecondMainSec() {
  return (
    <section className="mt-6 sm:mt-8 md:mt-10">
      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Category Event</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/events?category=${encodeURIComponent(cat.name)}`}
            className="group rounded-lg sm:rounded-xl border bg-white p-3 sm:p-4 md:p-6 flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 hover:shadow-md transition"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-500 transition">
              <cat.icon className="text-blue-500 group-hover:text-white w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </div>

            <span className="font-semibold text-xs sm:text-sm text-center">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}