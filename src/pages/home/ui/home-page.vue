<script setup lang="ts">
import { LMap, LTileLayer, LControlScale, LControlZoom } from "@vue-leaflet/vue-leaflet"
import MapPolyline from "./map-polyline.vue"
import MapPolygon from "./map-polygon.vue"
import type { PointTuple } from "leaflet"
import { computed, ref } from "vue"
import { useNewRegionStore } from "@/features/edit-region"
import NewRegionControls from "@/features/edit-region/ui/new-region-controls.vue"

const center = ref<PointTuple>([34.5, 37.26]) // in region's data
const zoom = ref(6) // in CONSTANT

const newRegionStore = useNewRegionStore()

const isDrawing = computed(() => newRegionStore.drawingPolygon !== null)

const { handleDraw } = newRegionStore
</script>

<template>
   <ui-spacing class="page" vertical fill grow>
      <ui-spacing
         class="content"
         fill
         grow
         gap="none"
         :class="['map', { 'cursor-pointer': isDrawing }]"
      >
         <NewRegionControls />

         <l-map
            ref="map"
            v-model:zoom="zoom"
            v-model:center="center"
            :useGlobalLeaflet="false"
            :options="{ attributionControl: false, zoomControl: false }"
            @click="handleDraw"
         >
            <l-control-scale position="bottomright" :imperial="true" :metric="false" />
            <l-tile-layer
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               layer-type="base"
               name="Stadia Maps Basemap"
            />
            <l-control-zoom position="bottomleft" />

            <MapPolyline />
            <MapPolygon />
         </l-map>
      </ui-spacing>
   </ui-spacing>
</template>

<style scoped>
.page {
   flex-shrink: 0;
}
.cursor-pointer > .leaflet-container {
   cursor: pointer;
}

.content {
   position: relative;
}
</style>
