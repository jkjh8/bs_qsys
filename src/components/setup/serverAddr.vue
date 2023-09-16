<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
// components
import Dialog from 'src/components/dialog/addressDialog'
// composables
import useNotify from 'src/composables/useNotify'

const $q = useQuasar()
const { $nInfo } = useNotify()

const current = ref('http://127.0.0.1')

function openDialog() {
  $q.dialog({
    component: Dialog
  }).onOk(async (addr) => {
    console.log(addr)
    if (addr) {
      const r = await API.onPromise({ command: 'updateAddr', value: addr })
      if (r) current.value = addr
      $nInfo('Server Address updated', 'please restart for new server address')
    }
  })
}

onMounted(async () => {
  current.value = await API.onPromise({ command: 'getAddr' })
})
</script>

<template>
  <div class="row no-wrap justify-between items-center">
    <div class="text-bold sans-font">Server Address</div>
    <div class="row items-center q-gutter-x-sm">
      <div class="sans-font">
        {{ current }}
      </div>
      <q-btn
        round
        flat
        size="sm"
        icon="edit"
        color="primary"
        @click="openDialog"
      >
        <q-tooltip>Edit</q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<style scoped></style>
