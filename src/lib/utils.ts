import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Task, TaskWithSubtasks } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTasks(tasks: Task[]): TaskWithSubtasks[] {
  const parentTasks = tasks.filter((task) => task.parent === null);
  return parentTasks.map((task) => {
    const subtasks = tasks.filter((subtask) => subtask.parent === task.id);
    return { ...task, subtasks };
  });
}
