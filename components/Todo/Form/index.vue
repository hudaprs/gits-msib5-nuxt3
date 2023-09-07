<script setup lang="ts">
// Types
import { TFormProps, TFormEmits } from "./index.type";

// Define props and emitters
const props = defineProps<TFormProps>();
const emits = defineEmits<TFormEmits>();

/**
 * @description Submit form to server
 *
 * @return {void} void
 */
const onSubmit = (e: Event): void => {
  e.preventDefault();

  emits("submit", props.title);
};
</script>

<template>
  <input
    type="text"
    placeholder="✎ What needs to be done"
    :value="props.title"
    @keyup="
      emits('update:form', 'title', ($event?.target as HTMLInputElement).value)
    "
    @keyup.enter="onSubmit"
  />
</template>

<style scoped>
input {
  font-family: Poppins;
  width: 100%;
  height: 75px;
  padding: 0px 20px;
  font-size: 24px;
  font-weight: 400;
  border: none;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
}
</style>
