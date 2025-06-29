import { z } from "zod/v4"
import { MARKER_TYPES } from "./const/marker-icons"

const latLngTupleSchema = z.union([
   z.tuple([z.number(), z.number()]),
   z.tuple([z.number(), z.number(), z.number()]),
])

export const regionKeyMarkerSchema = z.object({
   id: z.number(),
   keyId: z.number().nullable(),
   latlngs: latLngTupleSchema.nullable(),
   type: z.enum(Object.values(MARKER_TYPES)),
   datetime: z.iso.datetime({ local: true }),
   color: z.string(),
   description: z.string(),
})

export const regionKeyPolygonSchema = z.object({
   id: z.number(),
   latlngs: z.array(latLngTupleSchema),
   weight: z.number(),
})

export const regionPolygonSchema = z.object({
   id: z.number(),
   name: z.string(),
   color: z.string(),
   polygons: z.array(regionKeyPolygonSchema),
})

export const regionSchema = z.object({
   name: z.string(),
   keys: z.array(regionPolygonSchema),
   center: latLngTupleSchema,
   markers: z.array(regionKeyMarkerSchema),
})

export type Region = z.infer<typeof regionSchema>
export type RegionKey = z.infer<typeof regionPolygonSchema>
export type RegionKeyPolygon = z.infer<typeof regionKeyPolygonSchema>
export type RegionKeyMarker = z.infer<typeof regionKeyMarkerSchema>
