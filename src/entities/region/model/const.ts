import type { PointTuple } from "leaflet"
import { MarkerType } from "./types"
import BattleIcon from "@/shared/assets/icons/battle.svg?url"

export const MARKER_SIZE = 38
export const MARKER_ICON_DIFFERENCE = 12
export const DEFAULT_MAP_CENTER: PointTuple = [34.5, 37.26]

export const MARKER_ICONS = {
   [MarkerType.BATTLE]: BattleIcon,
}
