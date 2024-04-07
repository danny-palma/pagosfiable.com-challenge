/**
 * This code snippet exports a logger instance using the Winston library.
 * The logger is configured to log messages to both a file and the console.
 * The log format includes the current timestamp, log level, and log message.
 * The logger's log level is determined by the NODE_ENV environment variable.
 * In production mode, the log level is set to 'info', while in other modes it is set to 'debug'.
 * The log files are stored in the '../../../logs' directory, and the filename includes the current timestamp.
 * The log files are formatted with a timestamp and the custom log format.
 * The console logger also includes a timestamp and colorizes the log output.
 * The logger is created using the createLogger function from the Winston library.
 * The logger instance is exported as a constant named 'Logger'.
 */

import { mkdir } from 'fs';
import path from 'path';
import { createLogger, format, transports } from 'winston';

const LogFormat = format.printf((Info) => {
    return `${new Date().toUTCString()} ${Info.level}: ${Info.message}`;
});

mkdir(path.resolve(__dirname, '../../../logs'), { recursive: true }, () => {});

export const Logger = createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    transports: [
        new transports.File({
            filename: Date.now() + '_logfile.log',
            dirname: path.resolve(__dirname, '../../../logs'),
            format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), LogFormat),
        }),
        new transports.Console({
            format: format.combine(
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                format.colorize(),
                LogFormat,
            ),
        }),
    ],
});
