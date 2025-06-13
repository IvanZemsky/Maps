<script setup lang="ts">
import type { LeafletMouseEvent, PointTuple } from "leaflet"
import { ref } from "vue"
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet"
import { MAP_CONFIG } from "../model/const"

type Props = {
   isDrawing: boolean
   handleDraw: (event: LeafletMouseEvent) => void
}

defineProps<Props>()

const center = ref<PointTuple>([34.5, 37.26]) // in region's data
const zoom = ref(MAP_CONFIG.zoom) // in region's data
</script>

<template>
   <ui-spacing class="map-wrap" vertical fill grow>
      <ui-spacing
         class="content"
         fill
         grow
         gap="none"
         :class="['map', { 'cursor-pointer': isDrawing }]"
      >
         <l-map
            ref="map"
            v-model:zoom="zoom"
            v-model:center="center"
            :useGlobalLeaflet="false"
            :options="{
               attributionControl: false,
               zoomControl: false,
            }"
            @click="handleDraw"
         >
            <l-tile-layer
               layer-type="base"
               v-bind="MAP_CONFIG.tile"
            />
            <slot />
         </l-map>
      </ui-spacing>
   </ui-spacing>
</template>

<style scoped>
.map-wrap {
   flex-shrink: 0;
}
.cursor-pointer > .leaflet-container {
   cursor: pointer;
}

.content {
   position: relative;
}
</style>
