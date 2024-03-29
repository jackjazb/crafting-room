'use client';

import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { IoMdMore } from 'react-icons/io';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CRRLogo } from '../logo/CRRLogo';
import styles from './Navbar.module.scss';
import { createClass } from '@/lib/utils';

/**
 * The navbar.
 */
export const Navbar: FC = () => {
	const pathname = usePathname();

	const nav = useRef<HTMLElement>(null);
	const [menuOpen, setMenuOpen] = useState(false);

	const openMenu = () => {
		setHeight();
		document.body.style.overflow = 'hidden';
		setMenuOpen(true);
	};

	const closeMenu = () => {
		document.body.style.overflow = '';
		setMenuOpen(false);
	};

	useEffect(closeMenu, [pathname]); //close when navigating using the forward/back buttons

	const setHeight = () => {
		nav.current!.style.setProperty(
			'--nav-height',
			`${nav.current!.clientHeight}px`
		);
	};

	useEffect(() => {
		return () => {
			document.body.style.overflow = '';
		};
	}, []);

	return (
		<nav
			ref={nav}
			className={createClass(
				styles.navbar,
				menuOpen ? styles.open : null
			)}
		>
			<IoMdMore
				className={styles.menuIcon}
				aria-label='Toggle the navigation menu'
				onClick={() => menuOpen ? closeMenu() : openMenu()}
			/>
			<menu className={styles.menu}>
				<Link
					className={styles.crrIcon}
					href='/'
					aria-label='View the home page'
					onClick={closeMenu}
				>
					<CRRLogo />
				</Link>
				<Link
					className={styles.homeTextOption}
					href='/'
					aria-label='View the home page'
					onClick={closeMenu}
				>
					Home
				</Link>
				<Link
					href='/artists'
					aria-label='View the artists page'
					onClick={closeMenu}
				>
					Artists
				</Link>
				<Link
					href='/news'
					aria-label='View the news page'
					onClick={closeMenu}
				>
					News
				</Link>
				<Link
					href='/store'
					aria-label='View the store page'
					onClick={closeMenu}
				>
					Store
				</Link>
				<Link
					href='/events'
					aria-label='View the events page'
					onClick={closeMenu}
				>
					Events
				</Link>
				<Link
					href='/about'
					aria-label='View the about page'
					onClick={closeMenu}
				>
					About
				</Link>
			</menu>
		</nav>
	);
};
