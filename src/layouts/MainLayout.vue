<script setup>
import { onMounted } from 'vue'
// components
import HomeLogo from 'src/components/layout/homeLogo'
import ToolbarLinks from 'src/components/layout/toolbarLinks'
// composables
import useOnline from 'src/composables/useOnline.js'
// stores
// import { useOnlineStore } from 'src/stores/online'
// const onlineStore = useOnlineStore()
// computed
// Variables
// Functions

onMounted(() => {
  useOnline()
  // window.addEventListener('resize', () => {
  //   //
  //   API.windowSizePosition({
  //     height: window.outerHeight,
  //     width: window.outerWidth
  //   })
  // })
  // API.onPromise({ command: 'socketConnect' })
  // API.onResponse((args) => {
  //   switch (args.key) {
  //     case 'socketIoConnect':
  //       onlineStore.updateOnline(args.value)
  //       break
  //   }
  // })
})
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="header">
      <div class="row no-wrap full-height justify-between items-center">
        <HomeLogo />
        <ToolbarLinks />
      </div>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scope></style>
