import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('API', {
  onPromise: async (args) => {
    return await ipcRenderer.invoke('onPromise', { ...args })
  },
  online: async (args) => {
    return ipcRenderer.send('online', { ...args })
  },
  checkOnlinePromise: async (args) => {
    return ipcRenderer.invoke('checkOnlinePromise', { ...args })
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
