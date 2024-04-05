import { resolve } from 'path';
import findRoot from 'find-root';
import type { Config } from './lib/types';

const cmsRootDir = findRoot(__dirname);

const database: Config = ({ env }) => {
  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: env('DATABASE_PATH')
          ? resolve(env('DATABASE_PATH'))
          : resolve(cmsRootDir, '.tmp/data.db')
      },
      useNullAsDefault: true
    }
  };
};

export default database;
