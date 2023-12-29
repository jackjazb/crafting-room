import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import styles from './Home.module.scss';
import { ReleaseGrid } from '@/components/release/ReleaseGrid';
import { Carousel } from '@/components/carousel/Carousel';
import { strapi } from '@/lib/server/utils';
import { makeClass, mdi } from '@/lib/utils';
import { StrapiImage } from '@/components/strapi-image/strapi-image';

const HomePage: NextPage = async () => {
    const homePage = await strapi.getHomePage().catch(notFound);

    const features = homePage.attributes.features.data;

    return (
        <div>
            {features.length > 0 && (
                <section>
                    <Carousel>
                        {features.map(feature => (
                            <a
                                key={feature.id}
                                className={styles.feature}
                                href={`/news/${feature.attributes.title}`}
                            >
                                <StrapiImage
                                    className={styles.featureImage}
                                    image={feature.attributes.images.data[0]}
                                    format='xlarge'
                                    priority={features.indexOf(feature) === 0}
                                />
                                <div
                                    className={makeClass(
                                        styles.featureTitle,
                                        'overlay-text'
                                    )}
                                    dangerouslySetInnerHTML={mdi(feature.attributes.title)}
                                />
                            </a>
                        ))}
                    </Carousel>
                </section>
            )}

            <section className={styles.featureReleases}>
                <h1>
                    Featured Releases
                </h1>
                <ReleaseGrid releases={homePage.attributes.releases.data} />
            </section>
        </div>
    );
};

export default HomePage;