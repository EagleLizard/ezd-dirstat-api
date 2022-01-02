
import express, { Express } from 'express';

import { config } from '../config';
import { registerRoutes } from './routes';
import { logMiddleware } from './middleware/log-middleware';
import { corsMiddleware } from './middleware/cors-middleware';
import { logger } from './logger';


export function initServer(): Promise<void> {
  return new Promise((resolve, reject) => {
    let app: Express, port: number;
    port = config.PORT;

    app = express();

    app.use(logMiddleware);
    app.use(corsMiddleware);
    app.use(express.json());

    app = registerRoutes(app);

    app.listen(port, () => {
      logger.info(`Listening on port: ${port}`);
      resolve();
    });
  });
}

