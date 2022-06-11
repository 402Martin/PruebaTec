import winston, { createLogger, format, transports } from 'winston';

const getColor = (infoLevel: string): string => {
  switch (infoLevel) {
    case 'error':
      return '\u001b[1;31m';
    case 'warn':
      return '\u001b[1;33m';
    case 'info':
      return '\u001b[1;36m';
    default:
      return '\x1b[30m';
  }
};

export const consoleLoggerFormat = format.combine(
  format.timestamp({
    format: 'HH:mm:ss.SSS',
  }),
  format.printf(
    (info: any) =>
      `\x1b[7m${info.timestamp} ${getColor(
        info.level,
      )} [${info.level?.toUpperCase()}] \x1b[0m ${
        info.sqlMessage
          ? JSON.stringify({
              message: info.message,
              sql: info.sqlMessage,
            })
          : info.message
      }${info.splat !== undefined ? `${info.splat}` : ' '}`,
  ),
);

const logger: winston.Logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'DD-MM-YYYY HH:mm:ss.SSS',
    }),
    format.printf(
      (info: any) =>
        `${info.timestamp} - [${info.level?.toUpperCase()}]: ${
          info.stack
            ? JSON.stringify({
                message: info.message,
                error: info.error,
                sql: info.sqlMessage,
                stack: info.stack,
              })
            : info.message
        }${info.splat !== undefined ? `${info.splat}` : ' '}`,
    ),
  ),
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/debug.log', level: 'debug' }),
    new transports.File({ filename: 'logs/info.log' }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: 'logs/fatal_errors.log' }),
  ],
});
export default logger;
