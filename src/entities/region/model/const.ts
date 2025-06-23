import type { PointTuple } from "leaflet"
import { MARKER_TYPES } from "./types"
import BattleIcon from "@/shared/assets/icons/battle.svg?url"

export const MARKER_SIZE = 38
export const MARKER_ICON_DIFFERENCE = 12
export const DEFAULT_MAP_CENTER: PointTuple = [52.05, 14.70]

export const MARKER_ICONS = {
   [MARKER_TYPES.battle]: BattleIcon,
   [MARKER_TYPES.none]: BattleIcon,
}
