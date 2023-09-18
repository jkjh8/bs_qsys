<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { v4 as uuidv4 } from 'uuid'
import { storeToRefs } from 'pinia'
import useClipboard from 'vue-clipboard3'
// components
import Dialog from 'src/components/dialog/confirmDialog'
// composables
import useNotify from 'src/composables/useNotify'
// stores
import { useStatusStore } from 'src/stores/status.js'

// initialize
const { $nInfo } = useNotify()
const $q = useQuasar()
const { status } = storeToRefs(useStatusStore())

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
    const r = await API.onData({ key: 'uid', value: uid })
    if (r) {
      status.value = r
      $nInfo('Device Uid Updated', 'it will take effect after app restarted')
    }
  })
}

async function clipboardCopy() {
  await useClipboard().toClipboard(status.value.uid)
  $nInfo('Uid copy to clipboard')
}

onMounted(async () => {
  current.value = await API.onPromise({ command: 'getUid' })
})
</script>

<template>
  <div class="row no-wrap justify-between">
    <div class="text-bold sans-font q-mt-sm">ID</div>
    <div class="row no-wrap items-center q-gutter-sm">
      <div>{{ status.uid }}</div>
      <div>
        <q-btn
          round
          flat
          size="sm"
          icon="content_copy"
          color="primary"
          @click="clipboardCopy"
        >
          <q-tooltip>Copy</q-tooltip>
        </q-btn>
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
  </div>
</template>

<style scoped></style>
src/composables/useRules
