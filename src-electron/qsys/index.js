import Qrc from './qrc'
import logger from '/src-electron/logger'
import { sendLogToServer } from '/src-electron/api/socketio'

let qsys = {}
let qsysData = {}

function addQsys(args) {
  const { deviceId, ipaddress } = args
  qsys[deviceId] = new Qrc(ipaddress)
  qsys[deviceId].on('connect', (msg) => {
    logger.info(`qsys device connected ${args.name} ${deviceId} ${ipaddress}`)
    sendLogToServer({
      message: `Q-Sys Device Connected ${args.name} ${deviceId} ${ipaddress}`
    })
  })
  qsys[deviceId].on('data', (msg) => {
    console.log('device message', msg)
  })
  qsys[deviceId].on('error', (err) => {
    logger.error(
      `qsys device error: ${args.name} ${deviceId} ${ipaddress} ${err}`
    )
    sendLogToServer({
      level: 'error',
      message: `Q-Sys device error: ${args.name} ${deviceId} ${ipaddress} ${err}`
    })
  })
  qsys[deviceId].on('close', () => {
    logger.warn(
      `qsys device disconnected ${args.name} ${deviceId} ${ipaddress}`
    )
    sendLogToServer({
      message: `Q-Sys Device Disconnected ${args.name} ${deviceId} ${ipaddress}`
    })
  })
  qsys[deviceId].connect()
}

function sendCommandQsys(args) {
  const { deviceId, command } = args
}

function getPa(args) {
  const { deviceId } = args
  qsys[deviceId].addCommands({
    id: 'getPa',
    method: 'Component.GetControls',
    params: {
      Name: 'PA'
    }
  })
}
export { qsys, addQsys, getPa, sendCommandQsys }
