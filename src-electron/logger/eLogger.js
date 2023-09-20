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

export { eInfo, eError }
