<script setup>
import { onMounted } from 'vue'
import useOnline from 'src/composables/useOnline.js'

const { chkOnline } = useOnline()
onMounted(() => {
  chkOnline()
})
</script>
<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    />
  </q-page>
</template>
