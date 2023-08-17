<script setup>
// components
import HomeLogo from 'src/components/layout/homeLogo'
import ToolbarLinks from 'src/components/layout/toolbarLinks'
// composables
// computed
// Variables
// Functions
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
