import { computed, watch, type Ref } from "vue"
import { useInfoPanelStore } from "../model/stores/right-panel-store"
import type { RegionKeyMarker } from "@/entities/region"

export function useWatchFocusedMarker(focusedMarker: Ref<RegionKeyMarker | null>) {
   const rightPanelStore = useInfoPanelStore()

   const focusedMarkerId = computed(() => focusedMarker.value?.id || null)

   watch(focusedMarkerId, () => {
      if (focusedMarker) {
         rightPanelStore.open("notes")
      }
   })

   return focusedMarkerId
}
