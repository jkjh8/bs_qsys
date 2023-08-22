<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { v4 as uuidv4 } from 'uuid'
// components
import Confirm from 'src/components/dialog/confirmDialog'
// composables
import useNotify from 'src/composables/useNotify'
import useRules from 'src/composables/usrRules'

const { notifyInfo, notifyError } = useNotify()
const { required } = useRules()
const $q = useQuasar()

const current = ref('')
const bridgeId = ref('')

const updateId = async () => {
  try {
    if (current.value !== bridgeId.value) {
      const r = await API.onPromise({
        command: 'updateId',
        value: current.value
      })
      if (r) {
        bridgeId.value = current.value
        notifyInfo('updated id')
      }
    }
  } catch (err) {
    console.error(err)
    notifyError('update id failed')
  }
}

const confirmRefreshId = () => {
  $q.dialog({
    component: Confirm,
    componentProps: {
      title: 'Refresh ID?'
    }
  }).onOk(() => {
    current.value = uuidv4()
  })
}

onMounted(async () => {
  const id = await API.onPromise({ command: 'getId' })
  if (id) {
    current.value = id.value
    bridgeId.value = id.value
  }
})
</script>

<template>
  <div class="row no-wrap justify-between">
    <div class="row no-wrap">
      <div class="text-bold sans-font q-mt-sm">ID</div>
      <q-icon
        class="cursor-pointer"
        style="margin: 10px 0px 0px 5px"
        name="refresh"
        size="18px"
        color="primary"
        @click="confirmRefreshId"
      >
      </q-icon>
    </div>
    <q-input
      v-model="current"
      style="width: 35%; min-width: 200px"
      outlined
      dense
      :rules="[required]"
      lazy-rules
    >
      <template #append>
        <q-icon
          :class="current === bridgeId ? 'disabled' : 'cursor-pointer'"
          name="check_circle"
          color="primary"
          @click="updateId"
        />
      </template>
    </q-input>
  </div>
</template>

<style scoped></style>
