import { defineStore } from "pinia"
import { ref } from "vue"

export type InfoPanelType = "keys" | "notes"

export const useInfoPanelStore = defineStore("info-panel", () => {
   const opened = ref<InfoPanelType | null>(null)

   function open(type: InfoPanelType) {
      opened.value = type
   }

   function close() {
      opened.value = null
   }

   function isOpened(type: InfoPanelType) {
      return opened.value === type
   }

   return {
      opened,
      open,
      close,
      isOpened,
   }
})
