import Qrc from './qrc'
import logger from '/src-electron/logger'
import { sendLogToServer } from '/src-electron/api/socketio'
import { socket } from '/src-electron/api/socketio'
import initQsys from './init'
import { getToken, getFiles } from './functions/files'

// 1: getPa

let qsys = {}
let qsysData = {}

async function addQsys(args) {
  qsys[args.deviceId] = initQsys(args)
  qsysData[args.deviceId] = {}
  await getFiles(args)
  logger.info(
    `add qsys object: ${args.naem} ${args.deviceId} ${args.ipaddress}`
  )
}

function deleteQsys(deviceId) {
  delete qsys[deviceId]
  logger.warn(`remove qsys object: ${deviceId}`)
  console.log(qsys)
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
export {
  qsys,
  qsysData,
  addQsys,
  getPa,
  sendCommandQsys,
  dataProcess,
  deleteQsys
}
