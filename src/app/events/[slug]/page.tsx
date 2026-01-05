import { API_URL } from "@/lib/constants"
import Image from "next/image"
import { notFound } from "next/navigation"
import EventTabs from "./components/EventTabs"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa"
import { TbClockHour4Filled } from "react-icons/tb"

type Props = {
  params: Promise<{ slug: string }>
}

export default async function EventDetail({ params }: Props) {
  const { slug } = await params   // 🔥 INI WAJIB DI NEXT 16

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/event/slug/${slug}`,
    { cache: "no-store" }
  )

  if (!res.ok) return notFound()
  const event = await res.json()

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-3 sm:px-4 md:px-4 py-6 sm:py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">

          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="w-full h-48 sm:h-64 md:h-80 rounded-lg sm:rounded-2xl overflow-hidden bg-gray-100">
              {event.image ? (
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Image not available
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-3 sm:p-5 h-fit space-y-2 sm:space-y-3 shadow-sm rounded-lg sm:rounded-2xl">
            <h2 className="font-bold text-lg sm:text-xl">{event.title}</h2>

            <p className="flex items-center gap-3 text-sm sm:text-base">
              <FaMapMarkerAlt className="flex-shrink-0" /> <span className="break-words">{event.location}</span>
            </p>

            <p className="flex items-center gap-3 text-sm sm:text-base">
              <FaCalendarAlt className="flex-shrink-0" /> {new Date(event.startAt).toLocaleDateString()}
            </p>

            <p className="flex items-center gap-3 text-sm sm:text-base">
              <TbClockHour4Filled className="flex-shrink-0" />
              {new Date(event.startAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} – {new Date(event.endAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>

            <p className="pt-2 sm:pt-3 text-xs sm:text-sm text-gray-600">
              {event.organizer.name}
            </p>
          </div>

          <div className="col-span-1 lg:col-span-3">
            <EventTabs event={event} />
          </div>

        </div>
      </div>

      <Footer />
    </>
  )
}
