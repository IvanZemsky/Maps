<script setup lang="ts">
import { LMarker } from "@vue-leaflet/vue-leaflet"
import { getMarkerIcon, type Region } from "@/entities/region"
import { inject, type Ref } from "vue"

const region = inject<Ref<Region>>("region")

if (!region?.value) {
   throw new Error("Map region is not provided")
}
</script>

<template>
   <div v-for="key in region.keys" :key="key.id">
      <div v-for="marker in key.markers" :key="marker.id">
         <l-marker
            :id="marker.id"
            :lat-lng="marker.latlngs"
            :icon="getMarkerIcon(marker.type) as any"
         />
      </div>
   </div>
</template>
