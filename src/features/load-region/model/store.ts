import { regionSchema, type Region } from "@/entities/region"
import { defineStore } from "pinia"
import { ref, watch } from "vue"

export const useRegionStore = defineStore("regions", () => {
   const region = ref<Region | null>(null)
   const errorMessage = ref<string | null>(null)

   watch(region, () => {
      console.log("regionJSON changed:", region.value)
   })

   function loadRegionJSON(event: Event) {
      try {
         const target = event.target as HTMLInputElement
         const file = target.files?.[0]

         if (!file) {
            setErrorData("No file selected.")
            return
         }

         readFileWithFileReader(file)
      } catch (error) {
         setErrorData("Error reading file.")
      }
   }

   function readFileWithFileReader(file: File) {
      const fileReader = new FileReader()

      fileReader.onload = (fileReaderEvent) => {
         const stringJSON = fileReaderEvent.target?.result as string

         if (!stringJSON) {
            throw new Error("Error reading file.")
         }

         try {
            const parsedJSON = regionSchema.safeParse(JSON.parse(stringJSON))
            if (!parsedJSON.success) {
               console.error(parsedJSON.error)
               throw new Error(parsedJSON.error.message)
            }
            setRegionData(parsedJSON.data)
         } catch (error) {
            throw new Error("Error reading file.")
         }
      }

      fileReader.onerror = () => {
         throw new Error("Error reading file.")
      }

      fileReader.readAsText(file)
   }

   function setRegionData(data: Region) {
      region.value = data
      errorMessage.value = null
   }

   function setErrorData(message: string) {
      region.value = null
      errorMessage.value = message
   }

   return { region, errorMessage, loadRegionJSON }
})
