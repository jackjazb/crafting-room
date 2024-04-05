import { resolve } from 'path';
import type { Config } from '../../lib/types';
import { throwExp } from '../../lib/utils';

const server: Config = ({ env }) => {
  return {
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    app: {
      keys: env.array('APP_KEYS')
        ?? throwExp('Missing \'APP_KEYS\' environment variable')
    },
    url: env('PUBLIC_URL')
      ?? throwExp('Missing \'PUBLIC_URL\' environment variable'),
    dirs: {
      public: resolve(env('PUBLIC_DIR_PATH')
        ?? throwExp('Missing \'PUBLIC_DIR_PATH\' environment variable'))
    }
  };
};

export default server;
