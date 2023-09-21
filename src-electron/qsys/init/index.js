import Qrc from '../qrc'
import { eInfo, eWarn, eError } from '/src-electron/logger/eLogger'
import { deleteQsys } from '..'
import dataProcess from '../dataProcess'

export default function (args) {
  const deviceName = `${args.name} ${args.deviceId} ${args.ipaddress}`

  const socket = new Qrc(args.ipaddress)

  socket.on('connect', () => {
    eInfo(`Q-SYS Device Connected -- ${deviceName}`)
  })
  socket.on('close', () => {
    deleteQsys(args.deviceId)
    eWarn(`Q-SYS Device Closed -- ${deviceName}`)
  })

  socket.on('error', (err) => {
    eError(`Q-SYS Device Error:${err} -- ${deviceName}`)
  })
  socket.on('data', (data) => {
    dataProcess({ deviceId: args.deviceId, data })
    // TODO: qsys from data process
  })
  socket.connect()
  return socket
}
