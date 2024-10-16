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

  parentTasks.forEach((parentTask) => {
    for (let i = 0; i < childTasks.length; i++) {
      if (childTasks[i].parent === parentTask.id) {
        parentTask.subtasks ??= [];
        parentTask.subtasks.push(childTasks[i]);
        childTasks.splice(i, 1);
      }
    }
  });

  return { parentTasks, deprecatedTasks: childTasks };
}
