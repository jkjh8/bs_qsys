import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDeviceStore = defineStore('Device', () => {
  const devices = ref([])
  const updateDevices = (arr) => {
    devices.value = arr
  }
  return { devices, updateDevices }
})
