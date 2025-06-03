<script setup lang="ts">
import { computed } from "vue";
import { useNewRegionStore } from "../model/store"

const { name, id } = defineProps<{ name: string; id: number }>()

const newRegionStore = useNewRegionStore()

function startDrowingPolygon() {
   newRegionStore.startDrawing(id)
}

function handleColorChange(event: Event) {
   newRegionStore.setColor(id, (event.target as HTMLInputElement).value)
}

const { findPolygonById } = newRegionStore

const defaultColor = computed(() => findPolygonById(id)?.color)

console.log(defaultColor.value)
</script>

<template>
   <ui-card class="key-card" size="sm">
      <ui-spacing vertical gap="sm" align="stretch">
         <ui-input placeholder="Key #1" size="sm" />
         <ui-button
            :disabled="newRegionStore.drawingId === id"
            @click="startDrowingPolygon"
            class="key-draw-control-btn"
            size="sm"
            variant="outlined"
         >
            Draw
         </ui-button>
         <input
            class="color-input"
            type="color"
            @change="handleColorChange"
            :value="defaultColor"
         />
         <ui-button class="select-key-btn" size="sm" variant="outlined">Clear</ui-button>
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
