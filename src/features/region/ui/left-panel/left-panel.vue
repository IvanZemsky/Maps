<script setup lang="ts">
import { useLeftPanelStore } from "../../model/stores/left-panel-store"
import { ScrollBlock } from "@/shared/ui"

const leftPanelStore = useLeftPanelStore()
</script>

<template>
   <ScrollBlock position="right" class="content">
      <ui-button size="sm" variant="outlined" @click="leftPanelStore.close">
         Close
      </ui-button>

      <slot />

   </ScrollBlock>
</template>

<style scoped>
div.ui-wrapper.content {
   padding-left: 5px;
}
</style>
