import { resolve } from 'path';

/** @type {import('next').NextConfig} */
export default {
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
      resolve(import.meta.dirname, 'lib/scss/**/*.scss')
    ]
  }
};
