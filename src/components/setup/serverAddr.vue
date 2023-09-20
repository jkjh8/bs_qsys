<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
// components
import Dialog from 'src/components/dialog/addressDialog'
// composables
import useNotify from 'src/composables/useNotify'
// stores
const $q = useQuasar()
const { $nInfo, $nError } = useNotify()
// variables
const address = ref('127.0.0.1')

// functions
function openDialog() {
  $q.dialog({
    component: Dialog
  }).onOk(async (addr) => {
    if (addr) {
      try {
        await API.onData({ key: 'serveraddress', value: addr })
        await getServerAddress()
        $nInfo(
          'Server Address updated',
          'please restart for new server address'
        )
      } catch (error) {
        $nError('Server Address not updated')
      }
    }
  })
}

async function getServerAddress() {
  const r = await API.getData({ key: 'serveraddress' })
  if (r && r.value) {
    address.value = r.value
  }
}

onMounted(async () => {
  await getServerAddress()
})
</script>

<template>
  <div class="row no-wrap justify-between items-center">
    <div class="text-bold sans-font">Server Address</div>
    <div class="row items-center q-gutter-x-sm">
      <div class="sans-font">
        {{ address }}
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
