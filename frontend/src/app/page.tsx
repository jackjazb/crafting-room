import { Carousel } from "@/components/carousel/Carousel";
import { ReleaseGrid } from "@/components/release/ReleaseGrid";
import { StrapiImage } from "@/components/strapi-image/StrapiImage";
import { content } from "@/lib/server/content";
import { mdi } from "@/lib/utils";
import type { NextPage } from "next";
import Link from "next/link";

const HomePage: NextPage = async () => {
    const homePage = await content.homePage();

    const features = homePage.features;

    return (
        <main>
            {features.length > 0 && (
                <section>
                    <Carousel>
                        {features.map(article => (
                            <Link
                                key={article.id}
                                className="flex relative h-[60vh] no-underline"
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
                                    className="absolute bottom-0 m-5 font-semibold overlay text-2xl"
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
                className="pl-5 pr-5 mt-5 font-bold"
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
