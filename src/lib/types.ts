import type { Dispatch, SetStateAction } from "react";

export type FilterType = "active" | "completed" | "all";

export type Task = {
  id: string;
  parent: string | null;
  description: string;
  completed: boolean;
  active: boolean;
  order: number;
};

export type TaskWithSubtasks = Task & {
  subtasks: Task[];
};

export type SetStateType<T> = Dispatch<SetStateAction<T>>;
