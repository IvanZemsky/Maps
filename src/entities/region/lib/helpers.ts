import L from "leaflet"
import {
   DEFAULT_MAP_CENTER,
   MARKER_ICON_DIFFERENCE,
   MARKER_ICONS,
   MARKER_SIZE,
} from "../model/const"
import {
   MARKER_TYPES,
   type Region,
   type RegionKey,
   type RegionKeyPolygon,
} from "../model/types"

export function getDefaultRegion(): Region {
   const region: Region = {
      name: "",
      keys: [],
      center: DEFAULT_MAP_CENTER,
      markers: [],
   }
   region.keys.push(getDefaultRegionKey())
   region.keys[0].polygons.push(getDefaultRegionKeyPolygon())
   return region
}

export function getDefaultRegionKey(): RegionKey {
   return {
      id: Date.now(),
      name: "",
      color: "#000000",
      polygons: [],
   }
}

export function getDefaultRegionKeyPolygon(): RegionKeyPolygon {
   return {
      id: Date.now() + 1,
      latlngs: [],
      weight: 0,
   }
}

export function getDefaltMarker() {
   return {
      id: Date.now(),
      keyId: null,
      latlngs: null,
      type: "none" as keyof typeof MARKER_TYPES,
      datetime: "",
      color: "grey",
      description: "",
   }
}

type GetMarkerOptions = {
   type: keyof typeof MARKER_TYPES
   color: string
   markerSize?: number
   iconMarkerDifference?: number
}

export function getMarkerIcon({
   type,
   color,
   markerSize = MARKER_SIZE,
   iconMarkerDifference = MARKER_ICON_DIFFERENCE,
}: GetMarkerOptions) {
   const iconAnchorSize = markerSize / 2 // to const
   const iconSize = markerSize - iconMarkerDifference

   return L.divIcon({
      html: markerHTML({ type, color, markerSize, iconSize }),
      className: "",
      iconAnchor: [iconAnchorSize, iconAnchorSize],
   })
}

type MarkerHTMLOptions = {
   type: keyof typeof MARKER_TYPES
   color: string
   markerSize: number
   iconSize: number
}

function markerHTML({
   type,
   color,
   markerSize = MARKER_SIZE,
   iconSize = MARKER_SIZE - MARKER_ICON_DIFFERENCE,
}: MarkerHTMLOptions) {
   return `<div
              class="marker"
              style="
                width:${markerSize}px;
                height:${markerSize}px;
                justify-content:center; background-color: ${color};
              "
            >
              <img src="${MARKER_ICONS[type]}" style="width:${iconSize}px; height:${iconSize}px" />
            </div>`
}
