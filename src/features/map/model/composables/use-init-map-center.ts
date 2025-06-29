import { DEFAULT_MAP_CENTER } from "@/entities/region"
import type { PointTuple } from "leaflet"
import { ref, onMounted } from "vue"

export function useInitMapCenter(regionCenter?: PointTuple) {
   const mapCenter = ref<PointTuple>()

   onMounted(() => {
      mapCenter.value = (regionCenter as PointTuple) || DEFAULT_MAP_CENTER
   })

   return mapCenter
}
