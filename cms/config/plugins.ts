import type { Config } from './lib/types';

const admin: Config = {
	upload: {
		config: {
			breakpoints: {
				xlarge: 1500,
				large: 1000,
				medium: 750,
				small: 500
			}
		}
	}
};

export default admin;
