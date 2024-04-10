import { resolve } from 'path';

/** @type {import('next').NextConfig} */
export default {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**'
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
