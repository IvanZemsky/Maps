<script setup lang="ts">
import { RouterView } from "vue-router"
import MainHeader from "./main-header.vue"
</script>

<template>
   <ui-spacing class="layout" vertical gap="none">
      <MainHeader/>
      <ui-spacing class="main" as="main" align="stretch" grow fill>
         <router-view />
      </ui-spacing>
   </ui-spacing>
</template>

<style scoped>
.layout {
   height: 100vh;
   overflow-y: hidden;
}
.main {
   overflow-y: hidden;
}
</style>
