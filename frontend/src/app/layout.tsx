import "@scss/main.scss";
import type { FC, PropsWithChildren } from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";

export const metadata: Metadata = {
    title: "Crafting Room Recordings",
};

const RootLayout: FC<PropsWithChildren> = (props) => {
    return (
        <html lang="en">
            <body>
                <Navbar />
                {props.children}
                <Footer />
            </body>
        </html>
    );
};

export default RootLayout;
