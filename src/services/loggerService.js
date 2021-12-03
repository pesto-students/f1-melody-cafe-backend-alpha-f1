const winston = require('winston');

const winstonLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'web-api' },
  transports: [
    new winston.transports.Console()
  ]
});

module.exports = winstonLogger;