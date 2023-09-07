// Types
import { ETodoFilterMode, TTodo } from "@/utils/types/todo/todo.type";
import { TTodoStoreState } from "@/utils/types/todo/todo.store.type";

export const useTodoStore = defineStore("todo", {
  state: (): TTodoStoreState => ({
    isLoading: false,
    filterMode: ETodoFilterMode.ALL,
    list: [],
  }),
  getters: {
    getFilteredList(state): TTodo[] {
      return state.list.filter((todo) => {
        if (state.filterMode === ETodoFilterMode.ACTIVE) return !todo.completed;
        if (state.filterMode === ETodoFilterMode.COMPLETED)
          return todo.completed;
        if (state.filterMode === ETodoFilterMode.ALL) return todo;
      });
    },
    getActiveTodoList(state): TTodo[] {
      return state.list.filter((todo) => !todo.completed);
    },
  },
  actions: {
    /**
     * @description Set todo filter
     *
     * @param {ETodoFilterMode} filterMode
     *
     * @return {void} void
     */
    SET_TODO_FILTER(filterMode: ETodoFilterMode): void {
      this.filterMode = filterMode;
    },

    /**
     * @description Clear completed todo
     *
     * @return {void} void
     */
    CLEAR_COMPLETED(): void {
      this.list = this.list.filter((todo) => !todo.completed);
    },

    /**
     * @description Fetch todo list
     *
     * @return {Promise<void>} Promise<void>
     */
    async fetchTodoList(): Promise<TTodo[]> {
      this.isLoading = true;

      try {
        const { data } = await useNuxtApp().$axios.get("/todos", {
          params: {
            _limit: 5,
          },
        });
        this.list = [...data];

        return Promise.resolve(data);
      } catch (err) {
        return Promise.reject(err);
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * @description Create new todo
     *
     * @param {string} title
     *
     * @return {Promise<void>} Promise<void>
     */
    async createTodo(title: string): Promise<void> {
      this.isLoading = true;

      try {
        const newTodo = {
          id: Math.random(),
          title,
          completed: false,
        };

        await useNuxtApp().$axios.post("/todos", newTodo);

        this.list = [newTodo, ...this.list];
      } catch (err) {
        return Promise.reject(err);
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * @description Update existing todo
     *
     * @param {string} title
     * @param {string} type
     *
     * @return {Promise<void>} Promise<void>
     */
    async updateTodo(id: number): Promise<void> {
      this.isLoading = true;

      try {
        let existedTodo = this.list.find((todo) => todo.id === id) as TTodo;

        // Update status
        existedTodo.completed = !existedTodo.completed;

        await useNuxtApp().$axios.put(`/todos/${id}`, existedTodo);

        this.list = this.list.map((todo) =>
          todo.id === id ? existedTodo : todo,
        );
      } catch (err) {
        return Promise.reject(err);
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * @description Delete existing todo
     *
     * @param {number} id
     *
     * @return {Promise<void>} Promise<void>
     */
    async deleteTodo(id: number): Promise<void> {
      this.isLoading = true;

      try {
        await useNuxtApp().$axios.delete(`/todos/${id}`);

        this.list = this.list.filter((todo) => todo.id !== id);
      } catch (err) {
        return Promise.reject(err);
      } finally {
        this.isLoading = false;
      }
    },
  },
  persist: {
    paths: ["isLoading"],
  },
});
