import { regionProvideKeys, type RegionKeyMarker } from "@/entities/region"
import { useInject } from "@/shared/lib"
import type { ComputedRef } from "vue"

export function useNoteControls() {
   return useInject<{
      marker: RegionKeyMarker
      selectedMarker: ComputedRef<RegionKeyMarker | null>
      isSelected: ComputedRef<boolean>
   }>(regionProvideKeys.noteControls)
}
