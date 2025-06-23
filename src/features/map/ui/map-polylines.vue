<script setup lang="ts">
import type { Region } from "@/entities/region"
import { useInject } from "@/shared/lib"
import { LPolyline } from "@vue-leaflet/vue-leaflet"
import { type Ref } from "vue"

const props = defineProps<{
   drawingPolygonId?: number
}>()

const region = useInject<Ref<Region>>("region")

function isVisible(polylineId: number) {
   return props.drawingPolygonId === polylineId
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
