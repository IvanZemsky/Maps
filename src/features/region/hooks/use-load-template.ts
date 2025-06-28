import { ref } from "vue"
import { useRegionStore } from "../model/stores/store"
import { storeToRefs } from "pinia"

export function useLoadTemplate() {
   const isError = ref(false)

   const regionStore = useRegionStore()
   const {selectedTemplate} = storeToRefs(regionStore)

   async function handleSelect(templateValue: string) {
      try {
         const templateData = await import(
            `@/entities/region/api/data/${templateValue}.json`
         )
         regionStore.region = templateData.default
         isError.value = false
      } catch (error) {
         isError.value = true
         console.error(`Error loading template ${templateValue}:`, error)
      }
   }

   return {
      selectedTemplate,
      isError,
      handleSelect,
   }
}
