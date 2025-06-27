<script setup lang="ts">
import { LMarker } from "@vue-leaflet/vue-leaflet"
import { getMarkerIcon, type Region } from "@/entities/region"
import { type Ref } from "vue"
import { useInject } from "@/shared/lib"

const region = useInject<Ref<Region>>("region")

defineProps<{ focusedMarkerId: number | null }>()

defineEmits<{ (e: "focus", id: number): void }>()
</script>

<template>
   <div v-for="marker in region.markers" :key="marker.id">
      <l-marker
         v-if="marker.latlngs"
         :id="marker.id"
         :lat-lng="marker.latlngs"
         @click="$emit('focus', marker.id)"
         :icon="
            getMarkerIcon({
               type: marker.type,
               color: marker.color,
               focused: marker.id === focusedMarkerId,
            }) as any
         "
      />
   </div>
</template>
