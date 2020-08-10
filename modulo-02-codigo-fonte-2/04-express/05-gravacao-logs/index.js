import express from 'express';
// npm install winston
import winston from 'winston';

const app = express();
app.use(express.json());

const { printf, combine, label, timestamp } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'my-log.log' }),
  ],
  format: combine(label({ label: 'my-app' }), timestamp(), myFormat),
});

// erros em ordem. se mudar o level pra warn, vai imprimir apenas o warn e error
logger.error('Error log');
logger.warn('Warn log');
logger.info('Info log');
logger.verbose('Verbose log');
logger.debug('Debug log');
logger.silly('Silly log');
logger.log('warn', 'log com param');

app.listen(3000, () => {
  console.log('Api started');
});
