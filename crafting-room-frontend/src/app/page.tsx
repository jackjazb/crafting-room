import { Article, Homepage, resolveImageUrl, strapiFetch } from "@/lib/strapi-client";
import { ReleaseGrid } from "@/components/release/ReleaseGrid";
import { Spinner } from "@/components/loading/Spinner";
import styles from './Home.module.css';
import { Carousel } from "@/components/carousel/Carousel";

async function getHomepage(): Promise<Homepage> {
    const path = 'homepage';
    const params = {
        populate: {
            features: {
                populate: "*"
            },
            releases: {
                populate: "*"
            }
        }
    };

    const response = await strapiFetch(path, params);
    return response.data;
}

export default async function Home() {
    const homepage = await getHomepage();

    const articleSlides = homepage.attributes.features.data.map((feature: Article) =>
        <a key={feature.id} href={`news/${feature.attributes.title}`}>
            <div className={styles.featuredImage} style={{ backgroundImage: `url(${resolveImageUrl(feature.attributes.images.data[0])})` }}>
                <div className={styles.featureTitle}>{feature.attributes.title}</div>
            </div>
        </a>
    );

    return (
        <div>
            <Carousel>
                {articleSlides}
            </Carousel >

            <div className={styles.featuredReleases}>
                <h1>Featured Releases</h1>
                <ReleaseGrid columns={4} releases={homepage.attributes.releases.data} />
            </div>
        </div >
    );
}