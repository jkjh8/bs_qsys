import { socket } from '/src-electron/api/socketio'
import { qsysData } from '..'
/*
id
1: get pa

*/

export default function (args) {
  const { deviceId, data } = args
  console.log(deviceId, data)
  switch (data.id) {
    case 1:
      qsysData[deviceId]['pa'] = data.result.Controls
      break
  }
  if (socket) {
    socket.emit('data', { command: 'qsysData', data: qsysData })
  }
}
