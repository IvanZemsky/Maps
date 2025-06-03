import { defineStore } from "pinia"
import { ref } from "vue"

export const useModalStore = defineStore("modal", () => {
   const openedModal = ref<string | null>(null)

   function openModal(modalId: string) {
      console.log("openModal:", modalId)
      openedModal.value = modalId
   }

   function closeModal() {
      openedModal.value = null
   }

   return { openedModal, openModal, closeModal }
})
