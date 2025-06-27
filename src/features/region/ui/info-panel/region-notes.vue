<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useRegionStore } from "../../model/stores/store"
import {
   useRightPanelStore,
   type rightPanelType,
} from "../../model/stores/right-panel-store"
import RegionNote from "../region-note/region-note.vue"

const type: rightPanelType = "notes"

const regionStore = useRegionStore()

const rightPanelStore = useRightPanelStore()

const { region } = storeToRefs(regionStore)
</script>

<template>
   <ui-spacing
      class="content"
      align="stretch"
      vertical
      fill
      gap="sm"
      v-if="rightPanelStore.isOpened(type)"
   >
      <ui-button size="sm" @click="regionStore.markers.add">Add note</ui-button>

      <ui-spacing v-if="region.markers.length" vertical fill align="stretch" gap="sm">
         <RegionNote
            v-for="marker in region.markers"
            :key="marker.id"
            :marker="marker"
         />
      </ui-spacing>

      <p v-else>No notes</p>
   </ui-spacing>
</template>

<style scoped>
.ui-textarea.size-md.note-textarea :deep(textarea) {
   font-size: 0.8rem;
}
</style>
