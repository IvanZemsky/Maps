<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useRegionStore } from "../model/stores/store"
import { type Ref } from "vue"
import { type PointTuple } from "leaflet"
import { useDocumentKeydown, useInject } from "@/shared/lib"
import { ScrollBlock } from "@/shared/ui"
import KeyCard from "./region-panel/key-card.vue"
import { currentMapCenterKey } from "@/entities/map"

const currentCenter = useInject<Ref<PointTuple>>(currentMapCenterKey)

const regionStore = useRegionStore()

const { region } = storeToRefs(regionStore)

function setMapCenter() {
   regionStore.setCenter(currentCenter.value)
}

useDocumentKeydown((event) => {
   if (event.key === "Escape") {
      regionStore.keys.stopDrawing()
   }
   if (event.ctrlKey && event.key === "z") {
      event.preventDefault()
      regionStore.keys.removeLastPolygonCoords()
   }
})
</script>

<template>
   <ScrollBlock position="left">
      <ui-input
         placeholder="Region name"
         size="sm"
         class="region-name-input"
         v-model="region.name"
      />
      <ui-button size="sm" @click="regionStore.fileManager.saveRegionToFile">
         Save region
      </ui-button>

      <ui-button @click="setMapCenter" size="sm" variant="outlined">
         Set map center
      </ui-button>

      <ui-button
         :disabled="!regionStore.keys.drawingPolygon"
         @click="regionStore.keys.stopDrawing"
         class="key-draw-control-btn"
         size="sm"
         variant="outlined"
      >
         Stop drawing
      </ui-button>

      <key-card
         v-for="(key, index) in regionStore.region.keys"
         :id="key.id"
         :key="key.id"
         :number="index + 1"
      />

      <ui-button size="sm" @click="regionStore.keys.create">Add key</ui-button>
   </ScrollBlock>
</template>

<style scoped>
.key-draw-control-btn {
   position: sticky;
   top: 0;
   left: 0;
   z-index: 600;
}
</style>
