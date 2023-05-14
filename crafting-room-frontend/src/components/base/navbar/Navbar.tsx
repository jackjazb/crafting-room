import { useState } from 'react';
import { IoMdMore } from 'react-icons/io';
import './Navbar.css'

export function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	return (
		<div className="navbar">
			<IoMdMore className="menuIcon" onClick={() => setIsMenuOpen(!isMenuOpen)} />
			<span className={`navLinks ${isMenuOpen ? 'open' : ''}`}>
				<a className="crrIcon" href={'/'}>
					<img src="/crr.svg" alt="Crafting Rooms Recordings Logo">
					</img>
				</a>
				<a className="homeTextOption" href={`/`}>Home</a>
				<a href={`/artists`}>Artists</a>
				<a href={`/news`}>News</a>
				<a href={`/store`}>Store</a>
				<a href={`/events`}>Events</a>
			</span>
		</div>
	)
}