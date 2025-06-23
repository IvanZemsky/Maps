<script setup lang="ts">
import { LMarker } from "@vue-leaflet/vue-leaflet"
import { getMarkerIcon, type Region } from "@/entities/region"
import { type Ref } from "vue"
import { useInject } from "@/shared/lib"

const region = useInject<Ref<Region>>("region")
</script>

<template>
   <div v-for="marker in region.markers" :key="marker.id">
      <l-marker
         :id="marker.id"
         :lat-lng="marker.latlngs"
         :icon="getMarkerIcon({ type: marker.type, color: marker.color }) as any"
      />
   </div>
</template>
