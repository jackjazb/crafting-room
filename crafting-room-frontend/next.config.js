// eslint-disable-next-line tsdoc/syntax
/** @type {import('next').NextConfig} */
module.exports = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: '**' //TODO -> this might not be good, double check this one
			}
		]
	}
};