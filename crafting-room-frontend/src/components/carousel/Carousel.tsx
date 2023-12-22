'use client';

import { Children, FC, PropsWithChildren, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import styles from './Carousel.module.css';

/**
 * Wraps its children in an Embla carousel.
 */
export const Carousel: FC<PropsWithChildren> = ({ children }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 20 });

    const scrollPrev = useCallback(() => {
        if (emblaApi)
            emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi)
            emblaApi.scrollNext();
    }, [emblaApi]);

    const childrenList = Children.toArray(children);

    return (
        <div className={styles.embla}>
            <div
                ref={emblaRef}
                className={styles.embla__viewport}
            >
                <div className={styles.embla__container}>
                    {childrenList.map(child => (
                        <div
                            key={childrenList.indexOf(child)}
                            className={styles.embla__slide}
                        >
                            {child}
                        </div>
                    ))}
                </div>
                <div
                    className={`${styles.arrow} ${styles.prev}`}
                    onClick={scrollPrev}
                >
                    <RxCaretLeft size={45} />
                </div>
                <div
                    className={`${styles.arrow} ${styles.next}`}
                    onClick={scrollNext}
                >
                    <RxCaretRight size={45} />
                </div>
            </div>
        </div>
    );
};