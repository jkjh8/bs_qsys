<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { v4 as uuidv4 } from 'uuid'
// components
import Dialog from 'src/components/dialog/confirmDialog'
// composables
import useNotify from 'src/composables/useNotify'

const { $nInfo } = useNotify()
const $q = useQuasar()

const current = ref('')

function openDialog() {
  $q.dialog({
    component: Dialog,
    componentProps: {
      icon: 'edit',
      title: 'Create a new Device ID'
    }
  }).onOk(async () => {
    const uid = uuidv4()
    const r = await API.onPromise({ command: 'newUid', value: uid })
    if (r) {
      current.value = uid
      $nInfo('Device Uid Updated', 'it will take effect after app restarted')
    }
  })
}

onMounted(async () => {
  current.value = await API.onPromise({ command: 'getUid' })
})
</script>

<template>
  <div class="row no-wrap justify-between">
    <div class="text-bold sans-font q-mt-sm">ID</div>
    <div class="row no-wrap items-center q-gutter-sm">
      <div>{{ current }}</div>
      <q-btn
        round
        flat
        size="sm"
        icon="refresh"
        color="primary"
        @click="openDialog"
        ><q-tooltip>Edit</q-tooltip></q-btn
      >
    </div>
  </div>
</template>

<style scoped></style>
src/composables/useRules
