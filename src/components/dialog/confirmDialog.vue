<script setup>
import { useQuasar, useDialogPluginComponent } from 'quasar'
// dialog functions
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent()
// props
const props = defineProps({
  icon: String,
  iconColor: String,
  btnColor: String,
  title: String,
  caption: String,
  message: String
})
// emit
const emit = defineEmits([...useDialogPluginComponent.emits])
</script>

<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin border-radius sans-font">
      <q-card-section class="row no-wrap q-gutter-sm">
        <q-icon
          v-if="icon"
          style="margin-top: 10px"
          :name="icon"
          :color="iconColor ? iconColor : 'primary'"
          size="1.5rem"
        />
        <div class="text-subtitle1">{{ title }}</div>
      </q-card-section>

      <q-card-section v-if="message">
        {{ message }}
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
