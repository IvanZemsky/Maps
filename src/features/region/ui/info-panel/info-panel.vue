<script setup lang="ts">
import { useRightPanelStore } from "../../model/stores/right-panel-store"
import { ScrollBlock } from "@/shared/ui"

const rightPanelStore = useRightPanelStore()
</script>

<template>
   <ScrollBlock position="right" class="content">
      <ui-button size="sm" variant="outlined" @click="rightPanelStore.close">
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
