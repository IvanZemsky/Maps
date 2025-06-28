<script setup lang="ts">
import { MARKER_ICONS } from "@/entities/region"
import { MModal } from "@/shared/ui"
import { useRegionStore } from "../../model/stores/store"

const open = defineModel<boolean>({
   required: true,
   default: false,
})

const regionStore = useRegionStore()

function selectIcon(icon: keyof typeof MARKER_ICONS) {
   regionStore.markers.setIconToSelected(icon)
   open.value = false
}
</script>

<template>
   <MModal v-model="open">
      <ui-card class="card" size="lg">
         <ui-spacing vertical gap="sm">
            <p>Select marker</p>

            <ui-spacing wrap gap="sm">
               <ui-button
                  class="marker-icon-btn"
                  rounded
                  size="sm"
                  v-for="icon in MARKER_ICONS"
                  :key="icon.id"
                  @click="selectIcon(icon.type)"
               >
                  <img :src="icon.icon" alt="icon" class="marker-icon" />
               </ui-button>
            </ui-spacing>
         </ui-spacing>
      </ui-card>
   </MModal>
</template>

<style scoped>
.marker-icon-btn {
   width: 50px;
   height: 50px;
}
.marker-icon {
   width: 25px;
   height: 25px;
}
</style>
