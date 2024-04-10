import '@scss/main.scss';
import type { FC, PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/footer/Footer';

export const metadata: Metadata = {
    icons: {
        apple: { sizes: '180x180', url: '/apple-touch-icon.png' },
        icon: [
            { type: 'image/png', sizes: '32x32', url: '/favicon-32x32.png' },
            { type: 'image/png', sizes: '16x16', url: '/favicon-16x16.png' }
        ]
    },
    manifest: '/site.webmanifest'
};

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
