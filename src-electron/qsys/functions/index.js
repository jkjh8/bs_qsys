/*
id
1: get pa
8561: message page
8185: Zone Status configure
*/

import { qsys, qsysData } from '../'

function paMessage(args) {
  const { deviceId } = args
  qsys[deviceId].addCommands({
    id: 8561,
    method: 'PA.PageSubmit',
    params: {
      Zones: [2],
      Description: 'Remote client test',
      QueueTimeout: 30,
      Message: 'Pandas Dream.wav',
      Preamble: 'CChime long ascending triple.wav',
      Start: true,
      Mode: 'message',
      CancelDelay: 5,
      Priority: 3
    }
  })
}

function paSetZoneStatus(args) {
  const { deviceId } = args
  qsys[deviceId].addCommands({
    id: 8185,
    method: 'PA.ZoneStatusConfigure',
    params: {
      Enabled: true
    }
  })
}

function paResetZoneStatus(args) {
  const { deviceId } = args
  qsys[deviceId].addCommands({
    id: 8185,
    method: 'PA.ZoneStatusConfigure',
    params: {
      Enable: false
    }
  })
}
export { paMessage, paSetZoneStatus, paResetZoneStatus }
