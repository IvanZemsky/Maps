<script setup lang="ts">
import { computed } from "vue"
import { useNewRegionStore } from "../model/store"
import KeyCardPolygon from "./key-card-polygon.vue"

const { id } = defineProps<{ id: number }>()

const newRegionStore = useNewRegionStore()

function handleColorChange(event: Event) {
   newRegionStore.setColor(id, (event.target as HTMLInputElement).value)
}

const { findKeyById } = newRegionStore

const polygons = computed(() => findKeyById(id).polygons)

const defaultColor = computed(() => findKeyById(id)?.color)

function handleRemoveKey() {
   newRegionStore.removeKey(id)
}

function handleKeyNameChange(event: Event) {
   newRegionStore.setKeyName(id, (event.target as HTMLInputElement).value)
}
</script>

<template>
   <ui-card class="key-card" size="sm">
      <ui-spacing vertical gap="sm" align="stretch">
         <ui-input placeholder="Key #1" size="sm" @input="handleKeyNameChange" />
         <input
            class="color-input"
            type="color"
            @change="handleColorChange"
            :value="defaultColor"
         />

         <KeyCardPolygon
            v-for="(polygon, index) in polygons"
            :key="polygon.id"
            :id="id"
            :polygon="polygon"
            :number="index + 1"
         />
         <ui-button size="sm" @click="() => newRegionStore.createPolygon(id)">
            Add polygon
         </ui-button>
         <ui-button size="sm" @click="handleRemoveKey">Remove</ui-button>
      </ui-spacing>
   </ui-card>
</template>

<style scoped>
:deep(.ui-card.size-sm).key-card {
   border-radius: 15px;
   padding: 0.4rem;
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
