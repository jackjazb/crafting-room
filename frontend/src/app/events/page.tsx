import { EventTile } from "@/components/event/EventTile";
import { content } from "@/lib/server/content";
import type { NextPage } from "next";

const EventsPage: NextPage = async () => {
    const events = await content.events();// cms.getEvents()
    // .catch(notFound);

    const currentDate = new Date();

    // Split the list of events into past and future
    const pastEvents = events.filter(event =>
        new Date(event.date) < currentDate);

    const futureEvents = events.filter(event =>
        !pastEvents.includes(event));

    return (
        <main>
            {futureEvents.length > 0 && (
                <section className="container">
                    <h1>
                        Events
                    </h1>
                    <div>
                        {futureEvents.map(event => (
                            <EventTile
                                key={event.id}
                                event={event}
                                canBook={true}
                            />
                        ))}
                    </div>
                </section>
            )}

            {pastEvents.length > 0 && (
                <section className="container">
                    <h1>
                        Past Events
                    </h1>
                    <div>
                        {pastEvents.map(event => (
                            <EventTile
                                key={event.id}
                                event={event}
                                canBook={false}
                            />
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
};

export default EventsPage;
