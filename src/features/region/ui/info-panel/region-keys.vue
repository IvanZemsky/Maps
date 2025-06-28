<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useRegionStore } from "../../model/stores/store"
import {
   useInfoPanelStore,
   type InfoPanelType,
} from "../../model/stores/right-panel-store"
import InfoKeyItem from "./info-key-item.vue"
import MarkerPreview from "../region-note/marker-preview.vue"
import { MARKER_ICONS } from "@/entities/region"

const type: InfoPanelType = "keys"

const regionStore = useRegionStore()

const rightPanelStore = useInfoPanelStore()

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
      <ui-spacing v-if="region.keys.length" vertical fill align="stretch" gap="sm">
         <InfoKeyItem v-for="key in region.keys" :key="key.id" :data="key" />
      </ui-spacing>

      <p v-else>No data</p>

      <p>Icons</p>
      <div class="icons">
         <ui-spacing class="icon" align="center" gap="sm" v-for="icon in MARKER_ICONS" :key="icon.id">
            <MarkerPreview :icon="icon.icon" color="blue" class="marker-preview" />
            <p class="marker-desc">{{ icon.desc }}</p>
         </ui-spacing>
      </div>
   </ui-spacing>
</template>

<style scoped>
.icons{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}
.icon{
  height: 34px;
}
.marker-preview {
   width: 30px;
   height: 30px;
   flex-shrink: 0;
}
div.marker-preview :deep(img) {
   width: 23px;
   height: 23px;
}
.marker-desc {
   font-size: 12px;
}
</style>
