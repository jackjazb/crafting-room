import { EventDetails } from "@/components/event/EventDetails";
import { strapiFetch } from "@/lib/strapi-client";
import { notFound } from "next/navigation";

async function getEvent(id: string) {
    const path = `events/${id}`;
    const params = {
        populate: {
            image: {
                populate: "*"
            },
            artists: {
                populate: "*"
            }
        }
    };
    const response = await strapiFetch(path, params);
    return response.data;
}

export default async function EventPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const event = await getEvent(id as string);

    if (!event) {
        notFound();
    }

    return (
        <div className="container">
            <EventDetails event={event} />
        </div>
    );
}