import L from "leaflet"
import {
   DEFAULT_MAP_CENTER,
   MARKER_ICON_DIFFERENCE,
   MARKER_ICONS,
   MARKER_SIZE,
} from "../model/const"
import type { MarkerType, Region, RegionKey, RegionKeyPolygon } from "../model/types"

export function getDefaultRegion(): Region {
   const region: Region = {
      name: "",
      keys: [],
      center: DEFAULT_MAP_CENTER,
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
      weight: 0,
      polygons: [],
      markers: [],
   }
}

export function getDefaultRegionKeyPolygon(): RegionKeyPolygon {
   return {
      id: Date.now() + 1,
      latlngs: [],
   }
}

export function getMarkerIcon(
   type: MarkerType,
   markerSize: number = MARKER_SIZE,
   iconMarkerDifference: number = MARKER_ICON_DIFFERENCE,
) {
   const iconAnchorSize = markerSize / 2
   const iconSize = markerSize - iconMarkerDifference

   return L.divIcon({
      html: markerHTML(type, markerSize, iconSize),
      className: "",
      iconAnchor: [iconAnchorSize, iconAnchorSize],
   })
}

function markerHTML(type: MarkerType, markerSize: number, iconSize: number) {
   return `<div
              style="
                width:${markerSize}px;
                height:${markerSize}px;
                display:flex; align-items:center;
                justify-content:center; background-color: red;
                border-radius: 50%;
              "
            >
              <img src="${MARKER_ICONS[type]}" style="width:${iconSize}px; height:${iconSize}px" />
            </div>`
}
