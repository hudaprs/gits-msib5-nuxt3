// Types
import { ETodoFilterMode } from "@/utils/types/todo/todo.type";

export type TFilterProps = {
  filterMode: ETodoFilterMode;
  todoListLength: number;
};

export type TFilterEmits = {
  (e: "change", filterMode: ETodoFilterMode): void;
  (e: "clear-completed"): void;
};
