import { AboutPage, resolveImageUrl, strapiFetch } from "@/lib/strapi-client";
import styles from './AboutPage.module.css';

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
            <img src={resolveImageUrl(aboutPage.attributes.image.data)} />
            <h1>{aboutPage.attributes.header}</h1>
            <p className={styles.content}>{aboutPage.attributes.content}</p>
            <h1>Subscribe</h1>
            <div className={styles.contactForm}>
                <input type="text" placeholder="email"></input>
                <button className="button-primary">submit</button>
            </div>
        </div>
    )
}