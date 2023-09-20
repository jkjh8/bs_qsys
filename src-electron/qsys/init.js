import Qrc from './qrc'
import { eInfo, eError } from '/src-electron/logger/eLogger'

export default function (args) {
  const deviceName = `${args.name} ${args.deviceId} ${args.ipaddress}`

  const socket = new Qrc(ipaddress)

  socket.on('connect', () => {
    eInfo(`Q-SYS Device Connected -- ${deviceName}`)
  })
  socket.on('close', () => {
    // TODO: close function qsys object delete current device
  })
}
