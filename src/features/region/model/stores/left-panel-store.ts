import { defineStore } from "pinia"
import { ref } from "vue"

export type LeftPanelType = "keys" | "notes"

export const useLeftPanelStore = defineStore("left-panel", () => {
   const opened = ref<LeftPanelType | null>(null)

   function open(type: LeftPanelType) {
      opened.value = type
   }

   function close() {
      opened.value = null
   }

   function isOpened(type: LeftPanelType) {
      return opened.value === type
   }

   return {
      opened,
      open,
      close,
      isOpened,
   }
})
