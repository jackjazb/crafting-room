'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { IoMdMore } from 'react-icons/io';
import { CRRLogo } from '../logo/CRRLogo';
import styles from './Navbar.module.scss';

/**
 * The navbar.
 */
export const Navbar: FC = () => {
	const nav = useRef<HTMLElement>(null);
	const [menuOpen, setMenuOpen] = useState(false);

	const setHeight = () => {
		nav.current!.style.setProperty('--nav-height', `${nav.current!.clientHeight}px`);
	};

	useEffect(() => {
		setHeight();
		addEventListener('resize', setHeight);
		return () => removeEventListener('resize', setHeight);
	}, []);

	return (
		<nav
			ref={nav}
			className={`${styles.navbar} ${menuOpen ? styles.open : ''}`}
		>
			<IoMdMore
				className={styles.menuIcon}
				onClick={() => setMenuOpen(!menuOpen)}
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