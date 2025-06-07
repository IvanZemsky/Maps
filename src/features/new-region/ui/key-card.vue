<script setup lang="ts">
import { computed } from "vue"
import { useNewRegionStore } from "../model/store"

const { name, id } = defineProps<{ name: string; id: number }>()

const newRegionStore = useNewRegionStore()

function handleColorChange(event: Event) {
   newRegionStore.setColor(id, (event.target as HTMLInputElement).value)
}

const { findPolygonById, findPolygonsByKeyId } = newRegionStore

const polygons = computed(() => findPolygonsByKeyId(id))

const defaultColor = computed(() => findPolygonById(id)?.color)

console.log(defaultColor.value)
</script>

<template>
   <ui-card class="key-card" size="sm">
      <ui-spacing vertical gap="sm" align="stretch">
         <ui-input placeholder="Key #1" size="sm" />
         <input
            class="color-input"
            type="color"
            @change="handleColorChange"
            :value="defaultColor"
         />

         <ui-spacing
            v-for="(polygon, index) in polygons"
            :key="polygon.id"
            :class="[
               'polygon-card',
               { active: newRegionStore.drawingPolygonId === polygon.id },
            ]"
            align="center"
            gap="sm"
         >
            <p>{{ index + 1 }}</p>
            <ui-button
               :disabled="newRegionStore.drawingPolygonId === polygon.id"
               @click="() => newRegionStore.startDrawing(id, polygon.id)"
               class="key-draw-control-btn"
               size="sm"
               variant="outlined"
            >
               Draw
            </ui-button>
            <ui-button
               class="key-draw-control-btn"
               size="sm"
               variant="outlined"
               @click="() => newRegionStore.removePolygon(polygon.id)"
            >
               X
            </ui-button>
         </ui-spacing>
         <ui-button size="sm" @click="() => newRegionStore.createPolygon(id)">
            Add polygon
         </ui-button>
      </ui-spacing>
   </ui-card>
</template>

<style scoped>
:deep(.ui-card.size-sm).key-card {
   border-radius: 15px;
   padding: 0.4rem;
}
.key-draw-control-btn {
   flex-grow: 1;
   font-size: 0.8rem;
}
button.key-draw-control-btn:disabled {
   background-color: var(--neutral-main);
}
.select-key-btn {
   width: 100%;
}
.color-input {
   cursor: pointer;
   width: 100%;
   border: none;
   outline: none;
   overflow: hidden;
   box-shadow: none;
   padding: 0;
}
.color-input::-webkit-color-swatch-wrapper {
   padding: 0;
   border: none;
   outline: none;
}
</style>
