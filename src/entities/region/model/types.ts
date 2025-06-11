import { z } from "zod"

const latLngTupleSchema = z.union([
  z.tuple([z.number(), z.number()]),
  z.tuple([z.number(), z.number(), z.number()]),
]);

export const regionKeyPolygonSchema = z.object({
  id: z.number(),
  latlngs: z.array(latLngTupleSchema),
})

export type RegionKeyPolygon = z.infer<typeof regionKeyPolygonSchema>

export const regionPolygonSchema = z.object({
   id: z.number(),
   name: z.string(),
   color: z.string(),
   weight: z.number(),
   polygons: z.array(regionKeyPolygonSchema),
})

export type RegionKey = z.infer<typeof regionPolygonSchema>

export const regionSchema = z.object({
   name: z.string(),
   keys: z.array(regionPolygonSchema),
})

export type Region = z.infer<typeof regionSchema>
