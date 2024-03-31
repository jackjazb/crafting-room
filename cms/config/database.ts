import path from 'path';

export default ({ env }) => ({
  connection: {
    client: 'sqlite',
    connection: {
      filename: path.resolve(env('DATABASE_FILENAME', '../data/data.db')),
    },
    useNullAsDefault: true,
  },
});
