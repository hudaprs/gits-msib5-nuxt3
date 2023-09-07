// Types
import { ETodoFilterMode } from "./todo.type";

export type TTodoStoreState = {
  isLoading: boolean;
  list: TTodo[];
  filterMode: ETodoFilterMode;
};
