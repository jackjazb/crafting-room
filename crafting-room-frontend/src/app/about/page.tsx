import { AboutPage, resolveImageUrl, strapiFetch } from "@/lib/strapi-client";
import styles from './AboutPage.module.css';
import { SubscribeForm } from "@/components/email/SubscribeForm";

async function getAboutPage() {
    const path = 'about-page';
    const params = {
        populate: {
            image: {
                populate: "*"
            }
        }
    };
    const response = await strapiFetch(path, params);
    return response.data;
}

export default async function About() {
    const aboutPage: AboutPage = await getAboutPage();
    return (
        <div className="container">
            <img className={styles.image} src={resolveImageUrl(aboutPage.attributes.image.data)} />
            <h1>{aboutPage.attributes.header}</h1>
            <p className={styles.content}>{aboutPage.attributes.content}</p>
            {/* 
            // This will require some extra thought and conferring with Archie. All working except actual storing of emails.
            <h1>Subscribe</h1>
            <p>Subscribe to our mailing list.</p>
            <SubscribeForm /> */}
            {aboutPage.attributes.contact ?
                <>
                    <h1>Contact</h1>
                    <p className={styles.content}>{aboutPage.attributes.contact}</p>
                </>
                : undefined
            }
        </div>
    )
}   