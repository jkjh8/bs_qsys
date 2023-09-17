import { useStatusStore } from 'src/stores/status'
import { storeToRefs } from 'pinia'

export default function useDevices() {
  const { status } = storeToRefs(useStatusStore())

  function statusRtChannel() {
    API.rtStatus((args) => {
      status.value = args
      console.log('update stauts', args)
    })
  }

  return { statusRtChannel }
}
