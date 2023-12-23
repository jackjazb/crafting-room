import { NextPage } from 'next';
import styles from './Home.module.css';
import { ReleaseGrid } from '@/components/release/ReleaseGrid';
import { Carousel } from '@/components/carousel/Carousel';
import { strapi } from '@/lib/api/strapi-client';
import { backgroundCSS, markdownInline } from '@/lib/utils';

const HomePage: NextPage = async () => {
    const res = await strapi.getHomePage();
    const homePage = res.data;
    const features = homePage.attributes.features.data;

    return (
        <div>
            {features.length > 0 && (
                <Carousel>
                    {features.map(feature => (
                        <a
                            key={feature.id}
                            href={`news/${feature.attributes.title}`}
                        >
                            <div
                                className={styles.featuredImage}
                                style={backgroundCSS(feature.attributes.images.data[0], 'medium')}
                            >
                                <span //TODO -> h2/h3/h4/h5 this
                                    className={styles.featureTitle}
                                    dangerouslySetInnerHTML={markdownInline(feature.attributes.title)}
                                />
                            </div>
                        </a>
                    ))}
                </Carousel>
            )}

            <div className={styles.featuredReleases}>
                <h1>
                    Featured Releases
                </h1>
                <ReleaseGrid
                    columns={4}
                    releases={homePage.attributes.releases.data}
                />
            </div>
        </div>
    );
};

export default HomePage;