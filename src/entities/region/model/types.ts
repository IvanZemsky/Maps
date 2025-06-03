import { z } from "zod"

const latLngTupleSchema = z.tuple([
   z.number(), // Latitude
   z.number(), // Longitude
   z.number().optional(), // Optional Altitude
])

export const regionPolygonSchema = z.object({
   id: z.number(),
   name: z.string(),
   color: z.string(),
   weight: z.number(),
   latlngs: z.array(latLngTupleSchema),
})

export type RegionPolygon = z.infer<typeof regionPolygonSchema>

export const regionSchema = z.object({
   name: z.string(),
   polygons: z.array(regionPolygonSchema),
})

export type Region = z.infer<typeof regionSchema>
