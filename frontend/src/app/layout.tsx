import { Footer } from "@/components/footer/Footer";
import { Navbar } from "@/components/navbar/Navbar";
import "@scss/main.scss";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import "./globals.css";

export const metadata: Metadata = {
    title: "Crafting Room Recordings",
};

const RootLayout = (props: PropsWithChildren) => {
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
