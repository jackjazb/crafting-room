'use client';

import { useEffect, type FC } from 'react';

export const Secret: FC = () => {
	const secret = ['g', 'r', 'o', 'l', 'l', 'i', 'c', 'e'];
	let pressed: string[] = [];

	const check = () => {
		if (pressed.join('') !== secret.join(''))
			return;

		document.body.style.filter = 'invert(1)';
		document.body.style.backgroundColor = 'black';
	};

	const listener = (ev: KeyboardEvent) => {
		pressed.push(ev.key);
		pressed = pressed.slice(-secret.length);
		check();
	};

	useEffect(() => {
		document.addEventListener('keydown', listener);

		return () => {
			document.removeEventListener('keydown', listener);
		};
	}, []);

	return null;
};
