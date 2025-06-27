import { ref } from "vue"
import { useRegionStore } from "../model/stores/store"

export function useLoadTemplate() {
   const isError = ref(false)

   const regionStore = useRegionStore()

   async function handleSelect(templateValue: string) {
      try {
         const templateData = await import(
            `@/entities/region/api/data/${templateValue}.json`
         )
         regionStore.region = templateData.default
      } catch (error) {
         isError.value = true
         console.error(`Error loading template ${templateValue}:`, error)
      }
   }

   return {
      isError,
      handleSelect,
   }
}
