import type { NextPage } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from './Home.module.scss';
import { ReleaseGrid } from '@/components/release/ReleaseGrid';
import { Carousel } from '@/components/carousel/Carousel';
import { cms } from '@/lib/server/services';
import { makeClass, mdi } from '@/lib/utils';
import { StrapiImage } from '@/components/strapi-image/StrapiImage';

const HomePage: NextPage = async () => {
    //TODO: doing `notFound` on page requests like this is misleading as
    //no matter the api failure response, `notFound` is called
    const homePage = await cms.getHomePage().catch(notFound);

    const features = homePage.attributes.features.data;

    return (
        <main>
            {features.length > 0 && (
                <section className={styles.carousel}>
                    <Carousel>
                        {features.map(feature => (
                            <Link
                                key={feature.id}
                                className={styles.feature}
                                href={`/news/${feature.attributes.slug}`}
                            >
                                <StrapiImage
                                    className={styles.featureImage}
                                    image={feature.attributes.images.data[0]}
                                    format='source'
                                    priority={features.indexOf(feature) === 0}
                                />
                                <div
                                    className={makeClass(
                                        styles.featureTitle,
                                        'overlay-text'
                                    )}
                                    dangerouslySetInnerHTML={mdi(feature.attributes.title)}
                                />
                            </Link>
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
