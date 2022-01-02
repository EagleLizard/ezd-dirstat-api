
import { Express } from 'express';

import { getHealthcheck } from './controllers/get-healthcheck';
import { getDirsCtrl } from './controllers/dir-ctrl/get-dirs';

export function registerRoutes(app: Express): Express {
  app.get('/health', getHealthcheck);
  app.post('/dirs', getDirsCtrl);
  return app;
}
