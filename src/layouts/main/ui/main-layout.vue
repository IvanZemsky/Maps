<script setup lang="ts">
import { RouterView } from "vue-router"
import MainHeader from "./main-header.vue"
</script>

<template>
   <ui-spacing class="layout" vertical gap="none">
      <MainHeader/>
      <ui-spacing as="main" align="stretch" grow fill>
         <router-view />
      </ui-spacing>
      <footer></footer>
   </ui-spacing>
</template>

<style scoped>
.layout {
   min-height: 100vh;
}
</style>
