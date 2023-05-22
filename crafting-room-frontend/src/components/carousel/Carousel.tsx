'use client';

interface CarouselProps {

}
export function Carousel(props: React.PropsWithChildren<CarouselProps>) {
    return (
        <div>
            {props.children}
        </div>
    )
}