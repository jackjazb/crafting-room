import type { Config } from './lib/types';

const api: Config = {
  rest: {
    defaultLimit: 25,
    maxLimit: 100,
    withCount: true
  }
};

export default api;
