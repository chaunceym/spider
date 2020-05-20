const winston = require('winston')
require('winston-daily-rotate-file')

const {createLogger, transports} = winston
const {Console, DailyRotateFile} = transports

const logger = new createLogger({
  transports: [
    new Console(),
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