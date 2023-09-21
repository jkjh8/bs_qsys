import logger from './'
import { sendLogToServer } from '../api/socketio'

function eInfo(msg) {
  logger.info(msg)
  sendLogToServer({
    message: msg
  })
}

function eError(msg) {
  logger.error(msg)
  sendLogToServer({
    level: 'error',
    message: msg
  })
}

function eWarn(msg) {
  logger.warn(msg)
  sendLogToServer({
    level: 'warn',
    message: msg
  })
}

export { eInfo, eWarn, eError }
