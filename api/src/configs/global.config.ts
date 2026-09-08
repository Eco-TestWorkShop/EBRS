import { API_PREFIX } from '../shared/constants/global.constants';

import { Config } from './config.interface';

export const GLOBAL_CONFIG: Config = {
  nest: {
    port: 3300,
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'EcoWheel API',
    description: 'EcoWheel API build with NestJs',
    version: '1.5',
    path: API_PREFIX,
  },
  security: {
    expiresIn: 3600 * 24, // 24h
    bcryptSaltOrRound: 10,
  },
};
