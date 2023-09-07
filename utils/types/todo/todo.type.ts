export type TTodo = {
  id: number;
  title: string;
  completed: boolean;
};

export type TTodoForm = {
  title: string;
};

export enum ETodoFilterMode {
  ALL = "all",
  COMPLETED = "completed",
  ACTIVE = "active",
}
