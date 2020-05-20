const winston = require('winston')
require('winston-daily-rotate-file')

const {Logger, transports} = winston
const {Console, DailyRotateFile} = transports

winston.add(winston.transports.Console, {
  name : 'UNIQUE_NAME_HERE',
  level: 'info',
});

const logger = new Logger({
  transports: [
    new DailyRotateFile({
      name: 'base_logger',
      filename: './logs/info.log.',
      prepend: false,
      dataPattern: 'yyyy-MM-dd',
      level: 'info'
    }),
    new DailyRotateFile({
      name: 'error_logger',
      filename: './logs/error.log.',
      prepend: false,
      dataPattern: 'yyyy-MM-dd',
      level: 'error',
    })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(Console, {
    format: (info) => `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`,
  });
}

module.exports = logger