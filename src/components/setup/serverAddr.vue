<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
// components
import Dialog from 'src/components/dialog/addressDialog'
// composables
import useNotify from 'src/composables/useNotify'
// stores
import { useStatusStore } from 'src/stores/status.js'

const $q = useQuasar()
const { $nInfo } = useNotify()
const { serverAddr } = useStatusStore()
const current = ref('http://127.0.0.1')

function openDialog() {
  $q.dialog({
    component: Dialog
  }).onOk(async (addr) => {
    console.log(addr)
    if (addr) {
      const r = await API.onData({ key: 'serveraddress', value: addr })
      if (r) {
        $nInfo(
          'Server Address updated',
          'please restart for new server address'
        )
      }
    }
  })
}
</script>

<template>
  <div class="row no-wrap justify-between items-center">
    <div class="text-bold sans-font">Server Address</div>
    <div class="row items-center q-gutter-x-sm">
      <div class="sans-font">
        {{ serverAddr }}
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
