import { defineStore } from "pinia"
import { ref, type Ref } from "vue"
import { regionSchema, type Region } from "@/entities/region"

export function createRegionFileManagerStore(region: Ref<Region>) {
   return defineStore("regionFileManager", () => {
      const errorMessage = ref<string | null>(null)

      async function loadRegionFromFile(event: Event) {
         errorMessage.value = null
         const target = event.target as HTMLInputElement
         const file = target.files?.[0]

         if (!file) throw new Error("No file selected")

         try {
            const parsedRerion = await parseRegionFile(file)
            region.value = parsedRerion
         } catch (error) {
            errorMessage.value = `Error while loading file: ${file.name}`
            console.error("Error while loading region:", error)
         }
      }

      function saveRegionToFile() {
         const jsonStr = JSON.stringify(region.value, null, 2)
         const blob = new Blob([jsonStr], { type: "application/json" })
         const url = URL.createObjectURL(blob)
         applyDownloadLink(url, getFileName(region.value.name))
         URL.revokeObjectURL(url)
      }

      function getFileName(name: string) {
         if (!name) {
            return "region.json"
         }
         return `${name}.json`
      }

      function applyDownloadLink(url: string, filename: string) {
         const a = document.createElement("a")
         a.href = url
         a.download = filename
         document.body.appendChild(a)
         a.click()
      }

      function parseRegionFile(file: File): Promise<Region> {
         return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.onload = () => {
               try {
                  const json = JSON.parse(reader.result as string)
                  const result = regionSchema.safeParse(json)
                  if (result.success) {
                     resolve(result.data)
                  } else {
                     reject(result.error)
                  }
               } catch (error) {
                  reject(error)
               }
            }

            reader.onerror = () => reject(new Error("Failed to read file"))

            reader.readAsText(file)
         })
      }

      return {
         region,
         errorMessage,
         parseRegionFile,
         loadRegionFromFile,
         saveRegionToFile,
      }
   })
}
