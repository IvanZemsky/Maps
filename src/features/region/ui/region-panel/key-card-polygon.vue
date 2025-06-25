<script setup lang="ts">
import type { RegionKeyPolygon } from "@/entities/region"
import { CloseOutlined } from "@vicons/antd"
import { ref, type Ref } from "vue"
import { useRegionStore } from "../../model/stores/store";

const regionStore = useRegionStore()

const { keyId, polygon, number } = defineProps<{
   keyId: number
   polygon: Ref<RegionKeyPolygon>
   number: number
}>()

const polygonRef = ref(polygon.value)

function handleRemovePolygon() {
   regionStore.keys.removePolygon(polygon.value.id)
}

function handleDraw() {
   regionStore.keys.startDrawing(keyId, polygon.value.id)
}
</script>

<template>
   <ui-spacing
      :class="[
         'polygon-card',
         { active: regionStore.keys.drawingPolygon?.id === polygon.value.id },
      ]"
      align="center"
      gap="sm"
   >
      <ui-button
         :disabled="regionStore.keys.drawingPolygon?.id === polygon.value.id"
         @click="handleDraw"
         class="key-draw-control-btn"
         size="sm"
         variant="outlined"
      >
         Draw #{{ number }}
      </ui-button>
      <ui-input
         class="polygon-weight-input"
         size="sm"
         v-model.number="polygonRef.weight"
         type="number"
         min="0"
         max="5"
      />
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
:deep(.ui-input).polygon-weight-input input {
   width: 40px;
   padding: 0.25rem;
   text-align: center;
}
</style>
