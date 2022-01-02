
import winston, { createLogger, format, transport, transports } from 'winston';

import { config, isDevEnv } from '../config';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  access: 3,
  http: 4,
  debug: 5,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  access: 'white',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

const baseFormatConfig = [
  format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  format.errors({ stack: true }),
  format.splat(),
];

const formatConfig = format.combine(
  ...baseFormatConfig,
  format.printf(info => {
    return `[${info.timestamp}] ${info.level}: ${info.message}`;
  }),
);

const transportsConfig: transport[] = [
  getFileTransport(),
  getConsoleTransport(),
];

export const logger = createLogger({
  level: 'info',
  levels,
  format: formatConfig,
  defaultMeta: { service: 'eaglelizard-api' },
  transports: transportsConfig,
});

export const awsSdkLogStream = {
  write: (msg: string) => {
    logger.info(msg);
  }
};

function getFileTransport(): transport {
  let transportFormat: winston.Logform.Format[],
    transport: transport;
  transportFormat = [
    ...baseFormatConfig,
  ];
  transport = new transports.File({
    filename: `${config.APP_ROOT}/logs/eaglelizard-api.log`,
    format: format.combine(...transportFormat),
  });
  return transport;
}

function getConsoleTransport(): transport {
  let transportFormat: winston.Logform.Format[],
    transport: transport;
  transportFormat = [
    ...baseFormatConfig,
  ];
  if(isDevEnv()) {
    transportFormat.push(
      format.colorize({
        all: true,
      }),
    );
  }
  transport = new transports.Console({
    format: format.combine(...transportFormat),
  });
  return transport;
}
