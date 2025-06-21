<script setup lang="ts">
import { computed, ref } from "vue"
import { useNewRegionStore } from "../model/store"
import KeyCardPolygon from "./key-card-polygon.vue"

const { id } = defineProps<{ id: number; number: number }>()

const newRegionStore = useNewRegionStore()

const key = computed(() => newRegionStore.findKeyById(id))

function handleRemoveKey() {
   newRegionStore.removeKey(key.value.id)
}

function handleCreatePolygon() {
   newRegionStore.createPolygon(id)
}
</script>

<template>
   <ui-card class="key-card" size="sm">
      <ui-spacing vertical gap="sm" align="stretch">
         <ui-input :placeholder="`Key #${number}`" size="sm" v-model.trim="key.name" />
         <input class="color-input" type="color" v-model.lazy="key.color" />

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
.color-input {
   cursor: pointer;
   width: 100%;
   border: none;
   outline: none;
   overflow: hidden;
   box-shadow: none;
   padding: 0;
}
.color-input::-webkit-color-swatch-wrapper {
   padding: 0;
   border: none;
   outline: none;
}
</style>
