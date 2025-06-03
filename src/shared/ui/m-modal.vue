<script setup lang="ts">
import { computed, watch, ref } from 'vue';
import { useModalStore } from "../model";

const props = defineProps<{
  id: string;
}>();

const modalStore = useModalStore();

const isOpen = computed(() => modalStore.openedModal === props.id);

const internalIsOpen = ref(isOpen.value);

watch(isOpen, (newValue) => {
    internalIsOpen.value = newValue;
});

watch(internalIsOpen, (newValue) => {
  if (!newValue) {
    modalStore.closeModal();
  }
});
</script>

<template>
  <ui-modal v-model="internalIsOpen" teleport="#modal" >
    <slot />
  </ui-modal>
</template>
