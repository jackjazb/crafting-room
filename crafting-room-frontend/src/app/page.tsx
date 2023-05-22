'use client';
import { Article, buildClientRequestUrl, resolveImageUrl } from "@/lib/strapi-client";
import { ReleaseGrid } from "@/components/release/ReleaseGrid";
import { Spinner } from "@/components/loading/Spinner";
import useEmblaCarousel from 'embla-carousel-react'
import styles from './Home.module.css';
import useSWR from "swr";
import { useCallback } from "react";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx"

function buildHomepageRequest(): string {
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
    return buildClientRequestUrl(path, params);
}

const fetcher = (url: string) => fetch(url).then(r => r.json())


export default function Home() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 20 });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi]);

    const { data } = useSWR(buildHomepageRequest(), fetcher)

    if (!data) {
        return <Spinner />;
    }
    const homepage = data.data;

    return (
        <div>
            <div className={styles.embla}>
                <div className={styles.embla__viewport} ref={emblaRef}>
                    <div className={styles.embla__container}>
                        {
                            homepage.attributes.features.data.map((feature: Article) => {
                                const featureImageUrl = resolveImageUrl(feature.attributes.images.data[0]);
                                return (
                                    <div key={feature.id} className={styles.embla__slide}>
                                        <a href={`news/${feature.attributes.title}`}>
                                            <div className={styles.featuredImage} style={{ backgroundImage: `url(${featureImageUrl})` }}>
                                                <div className={styles.featureTitle}>{feature.attributes.title}</div>
                                            </div>
                                        </a>
                                    </div>);
                            })
                        }
                    </div>
                    <div className={`${styles.arrow} ${styles.prev}`} onClick={scrollPrev}>
                        <RxCaretLeft size={45} />
                    </div>
                    <div className={`${styles.arrow} ${styles.next}`} onClick={scrollNext}>
                        <RxCaretRight size={45} />
                    </div>
                </div>
            </div>
            <div className={styles.featuredReleases}>
                <h1>Featured Releases</h1>
                <ReleaseGrid columns={4} releases={homepage.attributes.releases.data} />
            </div>
            <script>
                const swiper = new Swiper('.swiper');
            </script>
        </div >
    );
}