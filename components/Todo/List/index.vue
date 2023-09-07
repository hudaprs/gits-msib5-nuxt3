<script setup lang="ts">
// Vue
import { ref } from "vue";

// Types
import { TListEmits, TListProps } from "./index.type";

// Define props and emits
const props = defineProps<TListProps>();
const emits = defineEmits<TListEmits>();

// Common State
const selectedTodoId = ref<number | null>(null);

/**
 * @description Watch any change when mouse enter to todo item
 *
 * @param {number} id
 *
 * @return {void} void
 */
const onMouseEnter = (id: number): void => {
  selectedTodoId.value = id;
};

/**
 * @description Watch any change when mouse leave from todo item
 *
 * @return {void} void
 */
const onMouseLeave = (): void => {
  selectedTodoId.value = null;
};
</script>

<template>
  <ul>
    <li
      v-for="todo in props.list"
      @mouseenter="onMouseEnter(todo.id)"
      @mouseleave="onMouseLeave"
    >
      <div class="title-wrapper">
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="emits('update-status', todo.id)"
        />

        <p :class="{ done: todo.completed }">
          {{ todo.title }}
        </p>
      </div>

      <div class="actions-wrapper">
        <button
          class="delete"
          v-if="todo.id === selectedTodoId"
          @click="emits('delete', todo.id)"
        >
          🗑
        </button>
      </div>
    </li>
  </ul>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}

p {
  word-break: break-all;
}

li {
  padding: 12px 18px;
  width: 100%;
  font-size: 24px;
  font-weight: 400;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  background-color: #3b3b3b;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}

li p {
  cursor: pointer;
}

button {
  background-color: transparent;
  color: #f87171;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
}

button.delete:hover {
  border: 1px solid #f87171;
}

.done {
  text-decoration: line-through;
}

.title-wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
}

.actions-wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
}

input[type="checkbox"] {
  width: 25px;
  height: 25px;
}
</style>
