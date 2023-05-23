'use client';
import { Children, useCallback } from 'react';
import styles from './Carousel.module.css';
import useEmblaCarousel from 'embla-carousel-react';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';



/**
 * Wraps its children in an Embla carousel
 */
export function Carousel(props: React.PropsWithChildren<{}>) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 20 });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi]);

    if (!props.children) {
        return <></>;
    }

    const slides = Children.toArray(props.children).map(child =>
        <div className={styles.embla__slide}>
            {child}
        </div>
    );

    return (
        <div className={styles.embla}>
            <div className={styles.embla__viewport} ref={emblaRef}>
                <div className={styles.embla__container}>
                    {slides}
                </div>
                <div className={`${styles.arrow} ${styles.prev}`} onClick={scrollPrev}>
                    <RxCaretLeft size={45} />
                </div>
                <div className={`${styles.arrow} ${styles.next}`} onClick={scrollNext}>
                    <RxCaretRight size={45} />
                </div>
            </div>
        </div>
    )
}