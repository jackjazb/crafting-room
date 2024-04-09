import type { Config } from './lib/types';

const admin: Config = ({ env }) => {
  return {
    auth: {
      secret: env('ADMIN_JWT_SECRET')
    },
    apiToken: {
      salt: env('API_TOKEN_SALT')
    },
    transfer: {
      token: {
        salt: env('TRANSFER_TOKEN_SALT')
      }
    }
  };
};

export default admin;
