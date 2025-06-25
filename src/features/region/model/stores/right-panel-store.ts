import { defineStore } from "pinia"
import { ref } from "vue"

export type rightPanelType = "keys" | "notes"

export const useRightPanelStore = defineStore("right-panel", () => {
   const opened = ref<rightPanelType | null>(null)

   function open(type: rightPanelType) {
      opened.value = type
   }

   function close() {
      opened.value = null
   }

   function isOpened(type: rightPanelType) {
      return opened.value === type
   }

   return {
      opened,
      open,
      close,
      isOpened,
   }
})
