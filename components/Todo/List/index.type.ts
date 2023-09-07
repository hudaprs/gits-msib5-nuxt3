// Types
import { TTodo } from "@/utils/types/todo/todo.type";

export type TListProps = {
  list: TTodo[];
};

export type TListEmits = {
  (e: "update-status", id: number): void;
  (e: "delete", id: number): void;
};
