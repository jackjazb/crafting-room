'use client';

import type { FC, PropsWithChildren } from 'react';
import { Children, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';
import styles from './Carousel.module.scss';
import { createClass } from '@/lib/utils';

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
                className={createClass(
                    styles.arrow,
                    styles.prev
                )}
                aria-label='Next slide'
                tabIndex={0}
                onClick={scrollPrev}
            >
                <RiArrowLeftLine size={32} />
            </button>
            <button
                className={createClass(
                    styles.arrow,
                    styles.next
                )}
                aria-label='Previous slide'
                tabIndex={0}
                onClick={scrollNext}
            >
                <RiArrowRightLine size={32} />
            </button>
        </div>
    );
};
