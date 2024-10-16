import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Task, TaskWithSubtasks } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTasks(tasks: Task[]): {
  parentTasks: TaskWithSubtasks[];
  deprecatedTasks: Task[];
} {
  const parentTasks = tasks.filter(
    (task) => task.parent === null
  ) as TaskWithSubtasks[];

  const childTasks = tasks.filter((task) => task.parent !== null);

  const deprecatedTasks: Task[] = [];

  childTasks.forEach((childTask) => {
    const parent = parentTasks.find(
      (parentTask) => parentTask.id === childTask.parent
    );

    if (parent) {
      parent.subtasks ??= [];
      parent.subtasks.push(childTask);
    } else {
      deprecatedTasks.push(childTask);
    }
  });

  return { parentTasks, deprecatedTasks };
}
