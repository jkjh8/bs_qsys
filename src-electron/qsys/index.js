import Qrc from './qrc'
import logger from '/src-electron/logger'
import { sendLogToServer } from '/src-electron/api/socketio'
import { socket } from '/src-electron/api/socketio'

// 1: getPa

let qsys = {}
let qsysData = {}

function addQsys(args) {
  const { deviceId, ipaddress } = args
  qsys[deviceId] = new Qrc(ipaddress)
  qsys[deviceId].on('connect', (msg) => {
    qsysData[deviceId] = {}
    logger.info(
      `qsys device connected -- ${args.name} ${deviceId} ${ipaddress}`
    )
    sendLogToServer({
      message: `Q-Sys Device Connected -- ${args.name} ${deviceId} ${ipaddress}`
    })
  })
  qsys[deviceId].on('data', (data) => {
    dataProcess(deviceId, data)
  })
  qsys[deviceId].on('error', (err) => {
    logger.error(
      `qsys device error ${err} -- ${args.name} ${deviceId} ${ipaddress}`
    )
    sendLogToServer({
      level: 'error',
      message: `Q-Sys device error ${err} -- ${args.name} ${deviceId} ${ipaddress} ${err}`
    })
  })
  qsys[deviceId].on('close', () => {
    logger.warn(
      `qsys device disconnected -- ${args.name} ${deviceId} ${ipaddress}`
    )
    sendLogToServer({
      message: `Q-Sys Device Disconnected -- ${args.name} ${deviceId} ${ipaddress}`
    })
  })
  qsys[deviceId].connect()
}

function sendCommandQsys(args, command) {
  const { deviceId, name, ipaddress } = args
  if (qsys[deviceId]) {
    qsys[deviceId].addCommands(command)
  } else {
    sendLogToServer({
      level: 'error',
      message: `Q-Sys Not connected, reject ${command} -- ${name} ${deviceId} ${ipaddress}`
    })
  }
}

function getPa(args) {
  const { deviceId, ipaddress } = args
  if (qsys[deviceId]) {
    qsys[deviceId].addCommands({
      id: 1,
      method: 'Component.GetControls',
      params: {
        Name: 'PA'
      }
    })
  } else {
    sendLogToServer({
      level: 'error',
      message: `Q-Sys Not connected, reject getStatus command -- ${args.name} ${deviceId} ${ipaddress}`
    })
  }
}

function dataProcess(deviceId, data) {
  console.log(deviceId, data)
  switch (data.id) {
    case 1:
      qsysData[deviceId]['pa'] = data.result.Controls
      break
  }
  socket.emit('qsysData', qsysData)
}
export { qsys, addQsys, getPa, sendCommandQsys, dataProcess }
