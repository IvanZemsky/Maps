<script setup lang="ts">
import type { RegionKeyPolygon } from "@/entities/region"
import { useNewRegionStore } from "../model/store"
import { CloseOutlined } from "@vicons/antd"

const newRegionStore = useNewRegionStore()

const { id, polygon, number } = defineProps<{
   id: number
   polygon: RegionKeyPolygon
   number: number
}>()

function handleRemovePolygon() {
   newRegionStore.removePolygon(polygon.id)
}

function handleDraw() {
   newRegionStore.startDrawing(id, polygon.id)
}
</script>

<template>
   <ui-spacing
      :key="polygon.id"
      :class="[
         'polygon-card',
         { active: newRegionStore.drawingPolygonId === polygon.id },
      ]"
      align="center"
      gap="sm"
   >
      <ui-button
         :disabled="newRegionStore.drawingPolygonId === polygon.id"
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
