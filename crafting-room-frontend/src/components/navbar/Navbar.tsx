'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { IoMdMore } from 'react-icons/io';
import { CRRLogo } from '../logo/CRRLogo';
import styles from './Navbar.module.scss';
import { makeClass } from '@/lib/shared/utils';

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
				<a
					className={styles.crrIcon}
					href='/'
				>
					<CRRLogo />
				</a>
				<a
					className={styles.homeTextOption}
					href='/'
				>
					Home
				</a>
				<a href='/artists'>
					Artists
				</a>
				<a href='/news'>
					News
				</a>
				<a href='/store'>
					Store
				</a>
				<a href='/events'>
					Events
				</a>
				<a href='/about'>
					About
				</a>
			</menu>
		</nav>
	);
};