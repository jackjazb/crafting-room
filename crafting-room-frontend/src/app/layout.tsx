import './skeleton.css';
import './globals.css';
import { FC } from 'react';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/footer/Footer';

const RootLayout: FC<{ children: React.ReactNode; }> = ({ children }) => {
    return (
        <html lang='en'>
            <body>
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
};

export default RootLayout;