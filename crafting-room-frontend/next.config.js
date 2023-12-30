/* eslint-disable tsdoc/syntax */
/* eslint-disable import/newline-after-import */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const { join } = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: '**' //TODO: these might not be good... double check this one
			},
			{
				protocol: 'https',
				hostname: '**'
			}
		]
	},
	sassOptions: {
		includePaths: [
			join(__dirname, 'lib/scss/**/*.scss')
		]
	}
};
