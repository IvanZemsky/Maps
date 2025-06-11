import type { Region, RegionKey, RegionKeyPolygon } from "./types"

export function getDefaultRegion(): Region {
   const region: Region = {
      name: "",
      keys: [],
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
   }
}

export function getDefaultRegionKeyPolygon(): RegionKeyPolygon {
   return {
      id: Date.now() + 1,
      latlngs: [],
   }
}
