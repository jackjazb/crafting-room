import { useParams } from "react-router-dom";
import { strapiFetch } from "../../utils/api";
import { useEffect, useState } from "react";
import { Loading } from "../base/loading/Loading";
import { Event, resolveImageUrl } from '../../utils/api';


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

export function EventPage() {
    const [event, setEvent] = useState<Event>();
    const id = useParams().id;
    console.log(useParams());
    useEffect(() => {
        getEvent(id ? id : '').then(setEvent);
    }, [id]);

    if (!event) {
        return (<Loading />);
    }

    const imageUrl = process.env.REACT_APP_STRAPI_URL + event.attributes.image.data.attributes.url;

    return (
        <div className="container">
            <h1>{event.attributes.title}</h1>
            <img className="eventImage" src={imageUrl} alt='' />
        </div>)
}