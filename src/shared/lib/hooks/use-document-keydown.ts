import { onMounted, onBeforeUnmount } from "vue"

export function useDocumentKeydown(handler: (e: KeyboardEvent) => void) {
   onMounted(() => {
      document.addEventListener("keydown", handler)
   })
   onBeforeUnmount(() => {
      document.removeEventListener("keydown", handler)
   })
}
