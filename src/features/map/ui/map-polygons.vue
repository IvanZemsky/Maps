<script setup lang="ts">
import { regionProvideKeys, type Region } from "@/entities/region"
import { useInject } from "@/shared/lib"
import { LPolygon } from "@vue-leaflet/vue-leaflet"
import { type Ref } from "vue"

const props = defineProps<{
   drawingPolygonId?: number
}>()

const region = useInject<Ref<Region>>(regionProvideKeys.region)

function isVisible(polygonId: number) {
   return props.drawingPolygonId !== polygonId
}
</script>

<template>
   <div v-for="key in region.keys" :key="key.id">
      <div v-for="polygon in key.polygons" :key="polygon.id">
         <l-polygon
            v-if="isVisible(polygon.id)"
            :id="polygon.id"
            :lat-lngs="polygon.latlngs"
            :color="key.color"
            :weight="polygon.weight"
         />
      </div>
   </div>
</template>
