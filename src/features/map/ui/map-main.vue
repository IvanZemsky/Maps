<script setup lang="ts">
import { type LeafletMouseEvent, type PointTuple } from "leaflet"
import { provide, ref, useTemplateRef, watch } from "vue"
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet"
import { MAP_CONFIG } from "../model/const"
import type { Region } from "@/entities/region"
import { DEFAULT_MAP_CENTER, regionProvideKeys } from "@/entities/region"
import { mapProvideKeys } from "@/entities/map"

const zoom = ref(MAP_CONFIG.zoom)

const mapRef = useTemplateRef("map")

const emit = defineEmits<{
   (e: "click", event: LeafletMouseEvent): void
}>()

const region = defineModel<Region>("region")
provide(regionProvideKeys.region, region)

const currentCenter = ref<PointTuple>(DEFAULT_MAP_CENTER)
provide(mapProvideKeys.currentCenter, currentCenter)

const regionCenter = ref(region.value?.center || DEFAULT_MAP_CENTER)

watch(region, (newVal) => {
   if (mapRef?.value?.leafletObject) {
      mapRef.value.leafletObject.setView(newVal?.center as PointTuple)
   }
})

function handleMoveEnd() {
   if (mapRef?.value?.leafletObject) {
      const center = mapRef.value.leafletObject.getCenter()
      currentCenter.value = [center.lat, center.lng]
   }
}
</script>

<template>
   <ui-spacing class="map-wrap" vertical fill grow>
      <ui-spacing class="content" fill grow gap="none">
         <l-map
            v-if="region"
            ref="map"
            v-model:zoom="zoom"
            v-model:center="(regionCenter as PointTuple)"
            :useGlobalLeaflet="false"
            :options="{
               attributionControl: false,
               zoomControl: false,
            }"
            @click="emit('click', $event)"
            @moveend="handleMoveEnd"
         >
            <l-tile-layer layer-type="base" v-bind="MAP_CONFIG.tile" />

            <slot />
         </l-map>
      </ui-spacing>
   </ui-spacing>
</template>

<style scoped>
.map-wrap {
   flex-shrink: 0;
}
.content {
   position: relative;
}
</style>
