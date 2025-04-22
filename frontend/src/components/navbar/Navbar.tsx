"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties, FC } from "react";
import { useEffect, useRef, useState } from "react";
import { IoMdMore } from "react-icons/io";
import { CRRLogo } from "../logo/CRRLogo";
import styles from "./Navbar.module.scss";

/**
 * The navbar.
 */
export const Navbar: FC = () => {
    const pathname = usePathname();

    const nav = useRef<HTMLElement>(null);
    const [navHeight, setNavHeight] = useState<number | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const openMenu = () => {
        document.body.style.overflow = "hidden";
        setNavHeight(nav.current?.clientHeight ?? 0);
        setMenuOpen(true);
    };

    const closeMenu = () => {
        document.body.style.overflow = "";
        setMenuOpen(false);
    };

    const toggleMenu = () => {
        if (menuOpen) {
            closeMenu();
        }
        else {
            openMenu();
        }
    };

    useEffect(closeMenu, [pathname]); // close when navigating using the forward/back buttons

    useEffect(() => closeMenu, []); // close when component is destroyed

    return (
        <nav
            ref={nav}
            className={styles.navbar}
            data-open={menuOpen}
            style={{
                "--nav-height": navHeight !== null
                    ? `${navHeight}px`
                    : undefined,
            } as CSSProperties}
        >
            <IoMdMore
                className={styles.menuIcon}
                aria-label="Toggle the navigation menu"
                onClick={toggleMenu}
            />
            <menu className={styles.menu}>
                <Link
                    className={styles.crrIcon}
                    href="/"
                    aria-label="View the home page"
                    onClick={closeMenu}
                >
                    <CRRLogo />
                </Link>
                <Link
                    className={styles.homeTextOption}
                    href="/"
                    aria-label="View the home page"
                    onClick={closeMenu}
                >
                    Home
                </Link>
                <Link
                    href="/artists"
                    aria-label="View the artists page"
                    onClick={closeMenu}
                >
                    Artists
                </Link>
                <Link
                    href="/news"
                    aria-label="View the news page"
                    onClick={closeMenu}
                >
                    News
                </Link>
                <Link
                    href="/store"
                    aria-label="View the store page"
                    onClick={closeMenu}
                >
                    Store
                </Link>
                <Link
                    href="/events"
                    aria-label="View the events page"
                    onClick={closeMenu}
                >
                    Events
                </Link>
                <Link
                    href="/about"
                    aria-label="View the about page"
                    onClick={closeMenu}
                >
                    About
                </Link>
            </menu>
        </nav>
    );
};
