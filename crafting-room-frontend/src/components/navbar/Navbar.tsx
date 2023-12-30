'use client';

import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { IoMdMore } from 'react-icons/io';
import Link from 'next/link';
import { CRRLogo } from '../logo/CRRLogo';
import styles from './Navbar.module.scss';
import { makeClass } from '@/lib/utils';

/**
 * The navbar.
 */
export const Navbar: FC = () => {
	const nav = useRef<HTMLElement>(null);
	const [menuOpen, setMenuOpen] = useState(false);

	const openMenu = () => {
		document.body.style.overflow = 'hidden';
		setMenuOpen(true);
	};

	const closeMenu = () => {
		document.body.style.overflow = '';
		setMenuOpen(false);
	};

	const setHeight = () => {
		nav.current!.style.setProperty('--nav-height', `${nav.current!.clientHeight}px`);
	};

	useEffect(() => {
		setHeight();
		addEventListener('resize', setHeight);

		return () => {
			removeEventListener('resize', setHeight);
			document.body.style.overflow = '';
		};
	}, []);

	return (
		<nav
			ref={nav}
			className={makeClass(
				styles.navbar,
				menuOpen ? styles.open : null
			)}
		>
			<IoMdMore
				className={styles.menuIcon}
				onClick={() => menuOpen ? closeMenu() : openMenu()}
			/>
			<menu className={styles.menu}>
				<Link
					className={styles.crrIcon}
					href='/'
					onClick={closeMenu}
				>
					<CRRLogo />
				</Link>
				<Link
					className={styles.homeTextOption}
					href='/'
					onClick={closeMenu}
				>
					Home
				</Link>
				<Link
					href='/artists'
					onClick={closeMenu}
				>
					Artists
				</Link>
				<Link
					href='/news'
					onClick={closeMenu}
				>
					News
				</Link>
				<Link
					href='/store'
					onClick={closeMenu}
				>
					Store
				</Link>
				<Link
					href='/events'
					onClick={closeMenu}
				>
					Events
				</Link>
				<Link
					href='/about'
					onClick={closeMenu}
				>
					About
				</Link>
			</menu>
		</nav>
	);
};
