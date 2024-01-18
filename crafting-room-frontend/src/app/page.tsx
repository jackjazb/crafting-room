import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from './Home.module.scss';
import { ReleaseGrid } from '@/components/release/ReleaseGrid';
import { Carousel } from '@/components/carousel/Carousel';
import { strapi } from '@/lib/server/services';
import { createClass, mdi } from '@/lib/utils';
import { StrapiImage } from '@/components/strapi-image/StrapiImage';

const HomePage: NextPage = async () => {
    const homePage = await strapi.getHomePage()
        .catch(notFound);

    const features = homePage.attributes.features.data;

    return (
        <main>
            {features.length > 0 && (
                <section className='no-section-margin'>
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
                                    format='xlarge'
                                    priority={features.indexOf(feature) === 0}
                                />
                                <div
                                    className={createClass(
                                        styles.featureTitle,
                                        'overlay-text',
                                        'overlay-text--large'
                                    )}
                                    dangerouslySetInnerHTML={mdi(feature.attributes.title)}
                                />
                            </Link>
                        ))}
                    </Carousel>
                </section>
            )}

            <section className='container-fluid'>
                <h1>
                    Featured Releases
                </h1>
                <ReleaseGrid releases={homePage.attributes.releases.data} />
            </section>
        </main>
    );
};

export default HomePage;