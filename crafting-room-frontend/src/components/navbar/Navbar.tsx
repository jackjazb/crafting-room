'use client';

import { useState } from 'react';
import { IoMdMore } from 'react-icons/io';
import styles from './Navbar.module.css'
import { CRRLogo } from '../logo/CRRLogo';

export function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	return (
		<div className={styles.navbar}>
			<IoMdMore className={styles.menuIcon} onClick={() => setIsMenuOpen(!isMenuOpen)} />
			<span className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
				<a className={styles.crrIcon} href={'/'}>
					<CRRLogo />
				</a>
				<a className={styles.homeTextOption} href={`/`}>Home</a>
				<a href={`/artists`}>Artists</a>
				<a href={`/news`}>News</a>
				<a href={`/store`}>Store</a>
				<a href={`/events`}>Events</a>
				<a href={`/about`}>About</a>
			</span>
		</div>
	)
}