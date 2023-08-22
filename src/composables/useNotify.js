import { useQuasar } from 'quasar'

export default function useNotify() {
  const $q = useQuasar()
  const notifyInfo = (msg, caption, location) => {
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
  const notifyError = (msg, caption, location) => {
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
  return { notifyInfo, notifyError }
}
