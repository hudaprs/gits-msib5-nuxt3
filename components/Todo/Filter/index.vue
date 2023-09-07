<script setup lang="ts">
// Types
import { TFilterEmits, TFilterProps } from "./index.type";
import { ETodoFilterMode } from "@/utils/types/todo/todo.type";

// Define props and emits
const props = defineProps<TFilterProps>();
const emits = defineEmits<TFilterEmits>();

const buttons = [
  { label: "All", value: ETodoFilterMode.ALL },
  { label: "Active", value: ETodoFilterMode.ACTIVE },
  { label: "Completed", value: ETodoFilterMode.COMPLETED },
];
</script>

<template>
  <div class="wrapper">
    <p>{{ props.todoListLength }} Items Left</p>
    <div>
      <button
        v-for="button in buttons"
        :class="{ active: props.filterMode === button.value }"
        @click="emits('change', button.value)"
      >
        {{ button.label }}
      </button>
    </div>
    <p class="clear-completed" @click="emits('clear-completed')">
      Clear Completed
    </p>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
}

.wrapper div {
  display: flex;
  gap: 10px;
}

.clear-completed {
  cursor: pointer;
}

button.active {
  border: 1px solid #fff;
}
</style>
