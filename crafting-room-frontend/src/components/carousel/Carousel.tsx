'use client';

import { Children, FC, PropsWithChildren, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import styles from './Carousel.module.scss';
import { makeClass } from '@/lib/utils';

/**
 * Wraps its children in an Embla carousel.
 */
export const Carousel: FC<PropsWithChildren> = props => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 20 });

    const scrollPrev = useCallback(() => {
        if (emblaApi)
            emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi)
            emblaApi.scrollNext();
    }, [emblaApi]);

    const childrenList = Children.toArray(props.children);

    return (
        <div className={styles.embla}>
            <div ref={emblaRef}>
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
            </div>
            <button
                className={makeClass(
                    styles.arrow,
                    styles.prev
                )}
                aria-label='Next slide'
                tabIndex={0}
                onClick={scrollPrev}
            >
                <RxCaretLeft size={45} />
            </button>
            <button
                className={makeClass(
                    styles.arrow,
                    styles.next
                )}
                aria-label='Previous slide'
                tabIndex={0}
                onClick={scrollNext}
            >
                <RxCaretRight size={45} />
            </button>
        </div>
    );
};