import type { NextPage } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from './Home.module.scss';
import { ReleaseGrid } from '@/components/release/ReleaseGrid';
import { Carousel } from '@/components/carousel/Carousel';
import { cms } from '@/lib/server/services';
import { createClass, mdi } from '@/lib/utils';
import { StrapiImage } from '@/components/strapi-image/StrapiImage';

const HomePage: NextPage = async () => {
    //TODO: doing `notFound` on page requests like this is misleading as
    //no matter the api failure response, `notFound` is called
    const homePage = await cms.getHomePage()
        .catch(notFound);

    const features = homePage.attributes.features.data;

    return (
        <main>
            {features.length > 0 && (
                <section className='standalone-section'>
                    <Carousel>
                        {features.map(article => (
                            <Link
                                key={article.id}
                                className={styles.featuredArticle}
                                href={`/news/${article.attributes.slug}`}
                                aria-label={`View the article '${article.attributes.title}'`}
                            >
                                <StrapiImage
                                    className={styles.featuredArticleImage}
                                    image={article.attributes.images.data[0]}
                                    format='source'
                                    priority={features.indexOf(article) === 0}
                                />
                                <div
                                    className={createClass(
                                        styles.featuredArticleTitle,
                                        'overlay-text'
                                    )}
                                    dangerouslySetInnerHTML={mdi(article.attributes.title)}
                                />
                            </Link>
                        ))}
                    </Carousel>
                </section>
            )}

            <section
                className={createClass(
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
