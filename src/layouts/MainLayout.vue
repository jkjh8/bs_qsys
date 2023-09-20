<script setup>
import { onBeforeMount, onMounted } from 'vue'
import { useQuasar } from 'quasar'
// components
import HomeLogo from 'src/components/layout/homeLogo'
import ToolbarLinks from 'src/components/layout/toolbarLinks'
// composables
// stores
import { useDeviceStore } from 'src/stores/devices'
// initalization
const $q = useQuasar()

// lifecycle hooks
onMounted(async () => {
  // API.getStatus()
  $q.loading.show()
  // await API.command({ command: 'initVal' })
  await API.command({ command: 'connect' })
  useDeviceStore().init()
  $q.loading.hide()
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
      <router-view class="view_page" />
    </q-page-container>
  </q-layout>
</template>

<style scope>
.view_page {
  padding: 5% 5%;
}
</style>
