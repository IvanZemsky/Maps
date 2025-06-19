<script setup lang="ts">
import type { Region } from "@/entities/region"
import { LPolyline } from "@vue-leaflet/vue-leaflet"
import { inject, type Ref } from "vue"

const props = defineProps<{
   drawingPolygonId?: number
}>()

const region = inject<Ref<Region>>("region")

function isVisible(polylineId: number) {
   return props.drawingPolygonId === polylineId
}

if (!region?.value) {
   throw new Error("Map region is not provided")
}
</script>

<template>
   <div v-for="key in region.keys" :key="key.id">
      <div v-for="polyline in key.polygons" :key="polyline.id">
         <l-polyline
            v-if="isVisible(polyline.id)"
            :id="polyline.id"
            :lat-lngs="polyline.latlngs"
            :color="key.color"
            :weight="1"
         />
      </div>
   </div>
</template>
