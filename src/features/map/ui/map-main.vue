<script setup lang="ts">
import type { LeafletEvent, LeafletMouseEvent, PointTuple } from "leaflet"
import { inject, onMounted, ref, useTemplateRef, type TemplateRef } from "vue"
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet"
import { MAP_CONFIG } from "../model/const"
import { DEFAULT_MAP_CENTER } from "@/entities/region/model/const"

const zoom = ref(MAP_CONFIG.zoom) // in region's data

const mapRef = useTemplateRef("map")

const emit = defineEmits<{
   (e: "click", event: LeafletMouseEvent): void
}>()

const currentCenter = defineModel<PointTuple>("center")

const center = ref<PointTuple>(currentCenter.value || DEFAULT_MAP_CENTER)

function handleMoveEnd(event: LeafletEvent) {
   if (mapRef.value) {
      currentCenter.value = [
         event.target.getCenter().lat,
         event.target.getCenter().lng,
      ] as PointTuple
   }
}

onMounted(() => {
   if (mapRef.value) {
      currentCenter.value = mapRef.value.center as PointTuple
      console.log(currentCenter.value)
   }
})
</script>

<template>
   <ui-spacing class="map-wrap" vertical fill grow>
      <ui-spacing class="content" fill grow gap="none">
         <l-map
            @moveend="handleMoveEnd"
            ref="map"
            v-model:zoom="zoom"
            v-model:center="center"
            :useGlobalLeaflet="false"
            :options="{
               attributionControl: false,
               zoomControl: false,
            }"
            @click="emit('click', $event)"
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
