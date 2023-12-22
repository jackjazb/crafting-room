import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import { EventDetails } from '@/components/event/EventDetails';
import { strapi } from '@/lib/api/strapi-client';

const EventPage: NextPage<{ params: { id: string; }; }> = async ({ params }) => {
    const { id } = params;
    const event = await strapi.getEvent(id);

    if (!event)
        notFound();

    return (
        <div className='container'>
            <EventDetails event={event} />
        </div>
    );
};

export default EventPage;