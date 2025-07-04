import RegionControls from "./ui/region-controls.vue"
import InfoPanel from "./ui/info-panel/info-panel.vue"
import KeyCard from "./ui/region-panel/key-card.vue"
import RegionKeys from "./ui/info-panel/region-keys.vue"
import SelectTemplateBtn from "./ui/select-template-btn.vue"
import RegionNotes from "./ui/info-panel/region-notes.vue"
import LoadRegionFromFileBtn from "./ui/load-region-from-file-btn.vue"

export { useRegionStore } from "./model/stores/store"
export { useInfoPanelStore } from "./model/stores/right-panel-store"
export { useWatchFocusedMarker } from "./model/composables/use-watch-focused-marker"

export type { InfoPanelType } from "./model/stores/right-panel-store"

export { defaultRegionTemplates } from "./model/const"

export {
   RegionControls,
   InfoPanel,
   KeyCard,
   RegionKeys,
   RegionNotes,
   SelectTemplateBtn,
   LoadRegionFromFileBtn,
}
