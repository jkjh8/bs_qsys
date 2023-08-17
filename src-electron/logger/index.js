import path from 'path'
import { app } from 'electron'
import winston from 'winston'
import wd from 'winston-daily-rotate-file'
import moment from 'moment'

moment.locale = 'ko'
// log file path
const logPath = path.resolve(app.getPath('userData'), 'log')

const { format } = winston
const logFormat = format.printf((i) => {
  return `${moment(i.timestamp).format('LLL')} ${i.level}: ${i.message}`
})

const logger = winston.createLogger({
  format: logFormat,
  transports: [
    new wd({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: logPath,
      filename: `%DATE%.log`,
      maxFiles: 30,
      zippedArchive: true
    }),
    new wd({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logPath,
      filename: `%DATE%.log`,
      maxFiles: 30,
      zippedArchive: true
    })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        logFormat
      )
    })
  )
}

export default logger
