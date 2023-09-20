<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { v4 as uuidv4 } from 'uuid'
import useClipboard from 'vue-clipboard3'
// components
import Dialog from 'src/components/dialog/confirmDialog'
// composables
import useNotify from 'src/composables/useNotify'
// stores

// initialize
const { $nInfo } = useNotify()
const $q = useQuasar()
// variables
const uid = ref('')

function openDialog() {
  $q.dialog({
    component: Dialog,
    componentProps: {
      icon: 'edit',
      title: 'Create a new Device ID'
    }
  }).onOk(async () => {
    try {
      const uuid = uuidv4()
      await API.onData({ key: 'uid', value: uuid })
      await getUid()
      $nInfo('Device Uid Updated', 'it will take effect after app restarted')
    } catch (error) {
      $nError('Device ID update failed')
    }
  })
}

async function clipboardCopy() {
  await useClipboard().toClipboard(uid.value)
  $nInfo('Uid copy to clipboard')
}
async function getUid() {
  const r = await API.getData({ key: 'uid' })
  if (r && r.value) {
    uid.value = r.value
  }
}
onMounted(async () => {
  await getUid()
})
</script>

<template>
  <div class="row no-wrap justify-between">
    <div class="text-bold sans-font q-mt-sm">ID</div>
    <div class="row no-wrap items-center q-gutter-sm">
      <div>{{ uid }}</div>
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
