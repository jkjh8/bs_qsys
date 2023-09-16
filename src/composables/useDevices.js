import { useDeviceStore } from 'src/stores/devices'
import { storeToRefs } from 'pinia'

export default function useDevices() {
  const { devices } = storeToRefs(useDeviceStore())

  function updateDevice(device) {
    devices.value = device
  }

  function APIDevices() {
    API.rtDevices((arr) => {
      devices.value = arr
    })
  }

  return { updateDevice, APIDevices }
}
