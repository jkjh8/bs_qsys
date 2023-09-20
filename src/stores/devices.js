import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDeviceStore = defineStore('devices', () => {
  const devices = ref([])
  function init() {
    API.rtDevices((arr) => {
      devices.value = arr
    })
  }
  return { devices, init }
})
