<script setup lang="ts">
// Axios
import { AxiosError } from "axios";

useHead({
  title: "Todo App - Todo List",
  meta: [{ name: "description", content: "All about your todo list" }],
});

const todoStore = useTodoStore();
let todoForm = ref<TTodoForm>({ title: "" });

const { error: todoListError, status: todoListStatus } = await useAsyncData(
  "fetchTodoList",
  () => todoStore.fetchTodoList(),
);
const cause = todoListError.value?.cause as AxiosError;

if (todoListStatus.value === "error") {
  if (process.server) {
    throw createError({
      statusCode: cause.response?.status,
      message: cause?.response?.statusText,
    });
  }
}

/**
 * @description Watch any change in todo form
 *
 * @param {string} type
 * @param {any} value
 *
 * @return {void} void
 */
const onChangeForm = (type: string, value: any) => {
  todoForm.value = { ...todoForm.value, [type]: value };
};

/**
 * @description Create new todo
 *
 * @param {string} title
 *
 * @return {Promise<void>}
 */
const onCreateTodo = async (title: string): Promise<void> => {
  try {
    await todoStore.createTodo(title);

    todoForm.value.title = "";
  } catch (_) {
    //
  }
};
</script>

<template>
  <!-- Title -->
  <h1>Todos</h1>

  <!-- Form -->
  <TodoForm
    :title="todoForm.title"
    @update:form="onChangeForm"
    @submit="onCreateTodo"
  />
  <!-- End Form -->

  <!-- Filter -->
  <TodoFilter
    :filter-mode="todoStore.filterMode"
    :todo-list-length="todoStore.getActiveTodoList.length"
    @change="todoStore.SET_TODO_FILTER"
    @clear-completed="todoStore.CLEAR_COMPLETED"
  />
  <!-- End Filter -->

  <!-- List -->
  <TodoList
    :list="todoStore.getFilteredList"
    @delete="todoStore.deleteTodo"
    @update-status="(id) => todoStore.updateTodo(id)"
  />
  <!-- End List -->

  <p v-if="todoStore.isLoading" class="text-center">Loading...</p>
</template>

<style scoped>
h1 {
  font-size: 100px;
  margin: 0;
  text-align: center;
  font-weight: 100;
}
</style>
