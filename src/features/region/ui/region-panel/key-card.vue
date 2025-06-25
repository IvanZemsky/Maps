<script setup lang="ts">
import { computed, ref } from "vue"
import { useRegionStore } from "../../model/stores/store"
import KeyCardPolygon from "./key-card-polygon.vue"
import { MColorInput } from "@/shared/ui";

const { id } = defineProps<{ id: number; number: number }>()

const regionStore = useRegionStore()

const key = computed(() => regionStore.keys.findById(id))

function handleRemoveKey() {
   regionStore.keys.remove(key.value.id)
}

function handleCreatePolygon() {
   regionStore.keys.createPolygon(id)
}
</script>

<template>
   <ui-card class="key-card" size="sm">
      <ui-spacing vertical gap="sm" align="stretch">
         <ui-input :placeholder="`Key #${number}`" size="sm" v-model.trim="key.name" />
         <MColorInput v-model="key.color" />

         <KeyCardPolygon
            v-for="(polygon, index) in key.polygons"
            :key="polygon.id"
            :keyId="id"
            :polygon="ref(polygon)"
            :number="index + 1"
         />
         <ui-button size="sm" @click="handleCreatePolygon">Add polygon</ui-button>
         <ui-button size="sm" @click="handleRemoveKey">Remove</ui-button>
      </ui-spacing>
   </ui-card>
</template>

<style scoped>
:deep(.ui-card.size-sm).key-card {
   border-radius: 15px;
   padding: 0.4rem;
}
.select-key-btn {
   width: 100%;
}
</style>
