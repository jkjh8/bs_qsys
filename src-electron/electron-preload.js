import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('API', {
  onPromise: async (args) => {
    return await ipcRenderer.invoke('onPromise', { ...args })
  },
  // db
  onData: async (args) => {
    return await ipcRenderer.invoke('onData', { ...args })
  },
  // status
  getStatus: () => {
    return ipcRenderer.send('getStatus')
  },
  rtStatus: (fn) => {
    ipcRenderer.on('rtStatus', (e, ...args) => {
      fn(...args)
    })
  },

  // devices
  getDevices: async () => {
    return await ipcRenderer.invoke('getDevices')
  },
  rtDevices: (fn) => {
    ipcRenderer.on('rtDevices', (e, ...args) => {
      fn(...args)
    })
  },
  // Commands
  command: (args) => {
    return ipcRenderer.send('command', { ...args })
  },
  onRequest: (args) => {
    return ipcRenderer.send('onRequest', { ...args })
  },
  onResponse: (fn) => {
    ipcRenderer.on('onResponse', (e, ...args) => {
      fn(...args)
    })
  }
  // windowSizePosition: (args) => {
  //   ipcRenderer.send('windowSizePosition', { ...args })
  // }
})
