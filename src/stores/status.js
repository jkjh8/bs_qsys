import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useStatusStore = defineStore('status', () => {
  const status = ref({
    socket: null,
    connected: false,
    socketId: '',
    serverAddr: '127.0.0.1',
    uid: '',
    devices: []
  })

  const online = computed(() => status.value.connected)
  const devices = computed(() => status.value.devices)
  const serverAddr = computed(() => status.value.serverAddr)
  const uid = computed(() => status.value.uid)

  return { status, online, devices, serverAddr, uid }
})
