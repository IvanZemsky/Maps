<script setup lang="ts">
import { useInfoPanelStore } from "../../model/stores/right-panel-store"
import { ScrollBlock } from "@/shared/ui"

const rightPanelStore = useInfoPanelStore()
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
