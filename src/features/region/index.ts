import RegionControls from "./ui/region-controls.vue"
import RightPanel from "./ui/right-panel/right-panel.vue"
import KeyCard from "./ui/region-panel/key-card.vue"
import RegionKeys from "./ui/right-panel/region-keys.vue"
import SelectTemplateBtn from "./ui/select-template-btn.vue"
import RegionNotes from "./ui/right-panel/region-notes.vue"
import LoadRegionFromFileBtn from "./ui/load-region-from-file-btn.vue"

export { useRegionStore } from "./model/stores/store"
export { useRightPanelStore } from "./model/stores/right-panel-store"

export type { rightPanelType } from "./model/stores/right-panel-store"

export { defaultRegionTemplates } from "./model/const"

export {
   RegionControls,
   RightPanel,
   KeyCard,
   RegionKeys,
   RegionNotes,
   SelectTemplateBtn,
   LoadRegionFromFileBtn,
}
