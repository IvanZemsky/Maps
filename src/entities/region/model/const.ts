import type { PointTuple } from "leaflet"
import AlertFilled from "@/shared/assets/icons/alert.svg?url"
import BattleIcon from "@/shared/assets/icons/battle.svg?url"
import NoneIcon from "@/shared/assets/icons/none.svg?url"
import type { MARKER_TYPES } from "./types"

export const MARKER_SIZE = 38
export const MARKER_ICON_DIFFERENCE = 12
export const DEFAULT_MAP_CENTER: PointTuple = [52.05, 14.7]

type MarkerIcon = {
  id: number
  icon: string
  type: keyof typeof MARKER_TYPES
}

export const MARKER_ICONS: Record<keyof typeof MARKER_TYPES, MarkerIcon> = {
   none: {
      id: 1,
      icon: NoneIcon,
      type: "none",
   },
   battle: {
      id: 2,
      icon: BattleIcon,
      type: "battle",
   },
   alert: {
      id: 3,
      icon: AlertFilled,
      type: "alert",
   },
}

// export const REGION_TEMPLATES: Record<string, Region> = {
//   "syria": {
//     name: "Syria",
//     keys: [],
//     polygons: [],
//   }
// }
