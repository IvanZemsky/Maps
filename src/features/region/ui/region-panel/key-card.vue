<script setup lang="ts">
import { computed, ref } from "vue"
import { useRegionStore } from "../../model/stores/store"
import KeyCardPolygon from "./key-card-polygon.vue"
import { MColorInput } from "@/shared/ui"
import KeyRemovalModal from "./key-removal-modal.vue"
import DeleteFilled from "@vicons/antd/DeleteFilled"

const { id } = defineProps<{ id: number; number: number }>()

const regionStore = useRegionStore()

const key = computed(() => regionStore.keys.findById(id))

const isModalOpen = ref(false)

function onColorInput(event: InputEvent) {
   const color = (event.target as HTMLInputElement).value
   const markers = regionStore.markers.getByKeyId(key.value.id)
   markers.forEach((marker) => (marker.color = color))
}

function handleModalOpen() {
   isModalOpen.value = true
}

function handleModalClose() {
   isModalOpen.value = false
}
</script>

<template>
   <ui-card class="key-card" size="sm">
      <ui-spacing vertical gap="sm" align="stretch">
         <ui-input :placeholder="`Key #${number}`" size="sm" v-model.trim="key.name" />
         <MColorInput v-model="key.color" @change="onColorInput" />

         <KeyCardPolygon
            v-for="(polygon, index) in key.polygons"
            :key="polygon.id"
            :keyId="id"
            :polygon="ref(polygon)"
            :number="index + 1"
         />
         <ui-spacing gap="sm" align="center">
            <ui-button
               class="add-polygon-btn"
               size="sm"
               @click="regionStore.keys.createPolygon(key.id)"
            >
               Add polygon
            </ui-button>
            <ui-button
               variant="outlined"
               class="remove-key-btn"
               size="sm"
               color="critical"
               @click="handleModalOpen"
            >
               <delete-filled />
            </ui-button>
         </ui-spacing>
      </ui-spacing>
   </ui-card>

   <KeyRemovalModal
      :id="id"
      v-model="isModalOpen"
      @cancel="handleModalClose"
      @submit="regionStore.keys.remove"
   />
</template>

<style scoped>
:deep(.ui-card.size-sm).key-card {
   border-radius: 15px;
   padding: 0.4rem;
}
.add-polygon-btn {
   flex-grow: 1;
}
.select-key-btn {
   width: 100%;
}
.remove-key-btn {
   flex-grow: 0;
}
button.remove-key-btn svg {
   width: auto;
   height: 0.8rem;
}
</style>
