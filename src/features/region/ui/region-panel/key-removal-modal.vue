<script setup lang="ts">
import { MModal } from "@/shared/ui"

const { id } = defineProps<{ id: number }>()

defineEmits<{ (e: "submit", id: number): () => void; (e: "cancel"): () => void }>()

const isOpen = defineModel<boolean>({
   required: true,
   default: false,
})
</script>

<template>
   <MModal class="modal" v-model="isOpen">
      <ui-card class="modal-card">
         <ui-spacing vertical>
            <p>Are you sure you want to delete this key?</p>

            <ui-spacing>
               <ui-button size="sm" color="critical" @click="$emit('submit', id)">
                  Yes
               </ui-button>
               <ui-button size="sm" @click="$emit('cancel')">No</ui-button>
            </ui-spacing>
         </ui-spacing>
      </ui-card>
   </MModal>
</template>

<style scoped>

</style>
