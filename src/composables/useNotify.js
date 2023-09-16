import { useQuasar } from 'quasar'

export default function useNotify() {
  const $q = useQuasar()
  const $nInfo = (msg, caption, location) => {
    $q.notify({
      type: 'positive',
      message: msg,
      caption: caption,
      position: location ? location : 'top',
      actions: [
        {
          icon: 'close',
          color: 'white',
          round: true
        }
      ]
    })
  }
  const $nError = (msg, caption, location) => {
    $q.notify({
      type: 'negative',
      message: msg,
      caption: caption ? caption : '',
      position: location ? location : 'top',
      actions: [
        {
          icon: 'close',
          color: 'white',
          round: true
        }
      ]
    })
  }
  return { $nInfo, $nError }
}
