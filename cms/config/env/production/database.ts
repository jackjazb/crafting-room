import { resolve } from 'path';
import type { Config } from '../../lib/types';
import { throwExp } from '../../lib/utils';

const database: Config = ({ env }) => {
  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: resolve(env('DATABASE_PATH')
          ?? throwExp('Missing \'DATABASE_PATH\' environment variable'))
      },
      useNullAsDefault: true
    }
  };
};

export default database;
