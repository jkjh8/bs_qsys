<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar, useDialogPluginComponent } from 'quasar'
import useRules from 'src/composables/useRules.js'
// dialog functions
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent()
// props
const props = defineProps({
  address: String
})
const addr = ref('')
// emit
const emit = defineEmits([...useDialogPluginComponent.emits])
</script>

<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin border-radius sans-font">
      <q-card-section class="row no-wrap q-gutter-sm items-center">
        <q-icon
          style="margin-top: 10px"
          name="edit"
          color="primary"
          size="1.2rem"
        />
        <div class="text-subtitle1 text-bold">Server Address</div>
      </q-card-section>

      <q-card-section>
        <div class="q-px-md">
          <q-input
            v-model="addr"
            dense
            filled
            @keyup.enter="onDialogOK(addr)"
          ></q-input>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <div class="q-px-sm q-gutter-x-sm">
          <q-btn
            round
            flat
            icon="cancel"
            color="red-10"
            @click="onDialogCancel"
          />
          <q-btn
            round
            flat
            icon="check"
            unelevated
            no-caps
            color="primary"
            @click="onDialogOK(addr)"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style>
.confirmDialog {
  max-width: 300px;
  min-width: 200px;
  border-radius: 0.5rem;
}
</style>
