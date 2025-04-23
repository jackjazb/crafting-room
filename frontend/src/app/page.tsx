import { Carousel } from "@/components/carousel/Carousel";
import { ReleaseGrid } from "@/components/release/ReleaseGrid";
import { StrapiImage } from "@/components/strapi-image/StrapiImage";
import { content } from "@/lib/server/content";
import { createClass, mdi } from "@/lib/utils";
import type { NextPage } from "next";
import Link from "next/link";
import styles from "./Home.module.scss";

const HomePage: NextPage = async () => {
    const homePage = await content.homePage();

    const features = homePage.features;

    return (
        <main>
            {features.length > 0 && (
                <section className="mt-0 mb-0">
                    <Carousel>
                        {features.map(article => (
                            <Link
                                key={article.id}
                                className="flex relative h-96 no-underline"
                                // className={styles.featuredArticle}
                                href={`/news/${article.slug}`}
                                aria-label={`View the article '${article.title}'`}
                            >
                                <StrapiImage
                                    className="w-full h-full"
                                    image={article.images[0]}
                                    format="source"
                                    priority={features.indexOf(article) === 0}
                                />
                                <div
                                    className="absolute b-0 m-5 font-semibold overlay"
                                    // className={createClass(
                                    //     styles.featuredArticleTitle,
                                    //     "overlay-text",
                                    // )}
                                    dangerouslySetInnerHTML={mdi(article.title)}
                                />
                            </Link>
                        ))}
                    </Carousel>
                </section>
            )}

            <section
                className={createClass(
                    styles.featuredReleases,
                    "container-fluid",
                )}
            >
                <h1>
                    Featured Releases
                </h1>
                <ReleaseGrid releases={homePage.releases} />
            </section>
        </main>
    );
};

export default HomePage;
