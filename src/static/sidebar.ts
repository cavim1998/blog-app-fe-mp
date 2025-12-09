import { LayoutDashboard, Ticket, Users, CalendarDays } from "lucide-react";

export const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["organizer"],
  },
  {
    title: "Transactions",
    href: "/dashboard/transactions",
    icon: Ticket,
    roles: ["organizer"],
  },
  {
    title: "Events",
    href: "/dashboard/events",
    icon: CalendarDays,
    roles: ["organizer"],
  },
  {
    title: "Attendees",
    href: "/dashboard/attendees",
    icon: Users,
    roles: ["organizer"],
  },
];
