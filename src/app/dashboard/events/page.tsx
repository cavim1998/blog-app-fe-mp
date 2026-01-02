"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { EventForm } from "@/components/app/event/AddEventForm";
import { EventFormValues } from "@/lib/validators/event";
import { formatIDR } from "@/lib/utils";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEvent } from '@/lib/events';

const initialEvents = [
  {
    id: 1,
    title: "Java Jazz Festival 2024",
    location: "JIExpo Kemayoran",
    startDate: "2024-05-24T18:00",
    endDate: "2024-05-24T23:00",
    description: "Festival jazz terbesar di Jakarta.",
    category: "Music",
    price: 350000,
    ticketType: "Paid",
    availableSeats: 5000,
    image: "",
  },
];

export default function EventsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventFormValues | null>(
    null,
  );
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const queryClient = useQueryClient();

  const createEventMutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  const handleSaveEvent = async (data: EventFormValues) => {
    let imageUrl = data.image;
    if (data.image instanceof File) {
      imageUrl = URL.createObjectURL(data.image);
    }

    const eventData = {
      title: data.title,
      description: data.description,
      location: data.location,
      startAt: data.startDate,
      endAt: data.endDate,
      price: data.price,
      totalSeats: data.availableSeats,
      availableSeats: data.availableSeats,
      isFree: data.ticketType === 'Free',
      image: imageUrl as string,
      category: { id: 1, name: data.category },
      organizer: { id: 1, name: 'Default Organizer' },
      slug: data.title.toLowerCase().replace(/\s+/g, '-'),
    };

    try {
      await createEventMutation.mutateAsync(eventData);
      // Update local state for UI
      if (editingEvent) {
        const updatedEvents = events.map((ev) =>
          ev.title === editingEvent.title
            ? { ...ev, ...data, image: imageUrl }
            : ev,
        );
        setEvents(updatedEvents);
      } else {
        const newEvent = {
          id: Math.random(),
          ...data,
          image: imageUrl,
        };
        setEvents([newEvent, ...events]);
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleEditClick = (event: EventTypes) => {
    const data = {
      title: event.title,
      description: event.description,
      location: event.location,
      startDate: event.startAt,
      endDate: event.endAt,
      ticketType: event.isFree ? "Free" : "Paid",
      price: event.price,
      availableSeats: event.availableSeats,
      category: event.categoryId.toString(),
      image: event.image,
    } as EventFormValues;
    setEditingEvent(data);
    setIsModalOpen(true);
  };

  const handleCreateClick = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-950">Event Management</h1>
          <p className="text-blue-500">
            Manage your event schedule, ticket prices, and promotions.
          </p>
        </div>
        <Button onClick={handleCreateClick} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Event
        </Button>
      </div>

      <Separator className="h-px bg-blue-100" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isPending && (
          <div className="col-span-3 my-16 text-center">
            <p className="text-2xl font-bold">Loading...</p>
          </div>
        )}

        {events?.data.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            handleEditClick={handleEditClick}
          />
        ))}
      </div>

      {/* Jika Data Kosong */}
      {events?.data.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-200 py-10 text-center text-gray-500">
          No Data.
        </div>
      )}

      {/* Component Pagination */}
      {events?.meta && (
        <PaginationSection meta={events.meta} onClick={onClickPagination} />
      )}

      {/* Form Modal (Reusable untuk Create & Edit) */}
      <EventForm
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        initialData={editingEvent}
      />
    </div>
  );
}
