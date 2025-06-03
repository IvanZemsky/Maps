<script setup lang="ts">
import {
   LMap,
   LTileLayer,
   LPolygon,
   LPolyline,
   LControlScale,
   LControlZoom,
} from "@vue-leaflet/vue-leaflet"
import type { LatLngTuple, PointTuple } from "leaflet" // Import LeafletMouseEvent
import { computed, ref, watch } from "vue"
import NewRegionModal from "@/features/new-region/ui/new-region-modal.vue"
import { useNewRegionStore } from "@/features/new-region"
import NewRegionControls from "@/features/new-region/ui/new-region-controls.vue"

const center = ref<PointTuple>([34.5, 37.26]) // in region's data
const zoom = ref(6) // in CONSTANT

const newRegionStore = useNewRegionStore()

const polygons = computed(() => newRegionStore.region.polygons)

const { handleDraw } = newRegionStore
</script>

<template>
   <ui-spacing class="page" vertical fill grow>
      <ui-spacing class="content" fill grow gap="none">
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
               url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
               layer-type="base"
               name="Stadia Maps Basemap"
            />
            <l-control-zoom position="bottomleft" />
            <div class="polyline" v-for="polyline in polygons" :key="polyline.id">
               <l-polyline
                  v-if="newRegionStore.drawingId === polyline.id"
                  :id="polyline.id"
                  :lat-lngs="polyline.latlngs"
                  :color="polyline.color"
               />
            </div>
            <div class="polygon" v-for="polygon in polygons" :key="polygon.id">
               <l-polygon
                  v-if="newRegionStore.drawingId !== polygon.id"
                  :id="polygon.id"
                  :lat-lngs="polygon.latlngs"
                  :color="polygon.color"
                  :weight="polygon.weight"
               />
            </div>
         </l-map>
      </ui-spacing>
   </ui-spacing>

   <NewRegionModal />
</template>

<style scoped>
.page {
   flex-shrink: 0;
}
</style>
