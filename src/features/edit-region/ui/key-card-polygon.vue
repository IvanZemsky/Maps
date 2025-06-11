<script setup lang="ts">
import type { RegionKeyPolygon } from "@/entities/region"
import { useNewRegionStore } from "../model/store"
import { CloseOutlined } from "@vicons/antd"

const newRegionStore = useNewRegionStore()

const { keyId, polygon, number } = defineProps<{
   keyId: number
   polygon: RegionKeyPolygon
   number: number
}>()

function handleRemovePolygon() {
   newRegionStore.removePolygon(polygon.id)
}

function handleDraw() {
   newRegionStore.startDrawing(keyId, polygon.id)
}
</script>

<template>
   <ui-spacing
      :class="[
         'polygon-card',
         { active: newRegionStore.drawingPolygon?.id === polygon.id },
      ]"
      align="center"
      gap="sm"
   >
      <ui-button
         :disabled="newRegionStore.drawingPolygon?.id === polygon.id"
         @click="handleDraw"
         class="key-draw-control-btn"
         size="sm"
         variant="outlined"
      >
         Draw #{{ number }}
      </ui-button>
      <ui-button
         class="key-draw-control-btn remove-polygon-btn"
         size="sm"
         variant="outlined"
         @click="handleRemovePolygon"
      >
         <CloseOutlined />
      </ui-button>
   </ui-spacing>
</template>

<style scoped>
.key-draw-control-btn {
   flex-grow: 1;
   font-size: 0.8rem;
}
.remove-polygon-btn {
   flex-grow: 0;
}
button.remove-polygon-btn svg {
   width: auto;
   height: 0.8rem;
}
button.key-draw-control-btn:disabled {
   background-color: var(--neutral-main);
}
</style>
