import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import styles from './Home.module.scss';
import { ReleaseGrid } from '@/components/release/ReleaseGrid';
import { Carousel } from '@/components/carousel/Carousel';
import { strapi } from '@/lib/server/services';
import { makeClass, mdi } from '@/lib/shared/utils';
import { StrapiImage } from '@/components/strapi-image/StrapiImage';

const HomePage: NextPage = async () => {
    const homePage = await strapi.getHomePage().catch(notFound);

    const features = homePage.attributes.features.data;

    return (
        <main>
            {features.length > 0 && (
                <section className={styles.carousel}>
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

            <section
                className={makeClass(
                    styles.featuredReleases,
                    'container-fluid'
                )}
            >
                <h1>
                    Featured Releases
                </h1>
                <ReleaseGrid releases={homePage.attributes.releases.data} />
            </section>
        </main>
    );
};

export default HomePage;