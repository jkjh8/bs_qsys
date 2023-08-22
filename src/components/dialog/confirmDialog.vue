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
        <q-btn
          style="border-radius: 6px"
          dense
          flat
          no-caps
          color="red-10"
          label="Cancel"
          @click="onDialogCancel"
        />
        <q-btn
          style="border-radius: 6px"
          dense
          unelevated
          no-caps
          :color="btnColor ?? 'primary'"
          label="Ok"
          @click="onDialogOK"
        />
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
