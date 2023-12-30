import '@scss/main.scss';
import type { FC, PropsWithChildren } from 'react';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/footer/Footer';

const RootLayout: FC<PropsWithChildren> = props => {
    return (
        <html lang='en'>
            <body>
                <Navbar />
                {props.children}
                <Footer />
            </body>
        </html>
    );
};

export default RootLayout;
