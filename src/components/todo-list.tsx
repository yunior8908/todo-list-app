"use client";

import { motion, AnimatePresence } from "framer-motion";

import AddTaskForm from "@/components/add-task-form";

import CompleteToggleForm from "@/components/complete-toggle-form";
import DeleteTaskForm from "@/components/delete-task-form";
import ExpandTaskForm from "@/components/expand-task-form";
import MotionWrapper from "@/components/ui/motion-wrapper";
import { CalendarInput } from "@/components/ui/calendar";
import { TaskWithSubtasks } from "@/lib/types";
import { cn } from "@/lib/utils";

export function TodoList({
  username,
  tasks,
}: {
  username: string;
  tasks: TaskWithSubtasks[];
}) {
  return (
    <AnimatePresence>
      {tasks?.map((task) => (
        <MotionWrapper
          key={task.id}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="mb-4"
        >
          <div
            className={cn(
              "bg-gray-100 p-4 shadow-md transition-all duration-300 hover:shadow-lg",
              { "bg-gray-300": task.active && task.parent === null }
            )}
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CompleteToggleForm task={task} />
                  <span
                    className={`text-lg ${
                      task.completed
                        ? "line-through text-gray-500"
                        : "text-gray-800"
                    }`}
                  >
                    {task.description}
                  </span>
                </div>
                <div className="flex items-center">
                  {task.parent === null ? <ExpandTaskForm task={task} /> : null}
                  <DeleteTaskForm task={task} />
                </div>
              </div>
              <div className="w-fit ml-auto ">
                <CalendarInput label="" name="start-date" />
              </div>
            </div>
            {task.parent === null ? (
              <AnimatePresence>
                {task.active && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-8 mt-2"
                  >
                    <ul className="space-y-2 mb-4">
                      {task?.subtasks?.map((subtask) => (
                        <motion.li
                          key={subtask.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.2 }}
                          className="bg-white p-2 rounded-md shadow-sm"
                        >
                          <div className="flex gap-4 justify-between">
                            <div className="flex items-center">
                              <CompleteToggleForm task={subtask} />

                              <span
                                className={`${
                                  subtask.completed
                                    ? "line-through text-gray-500"
                                    : "text-gray-800"
                                }`}
                              >
                                {subtask.description}
                              </span>
                            </div>
                            <DeleteTaskForm task={subtask} />
                          </div>
                          <div className="w-fit ml-auto ">
                            <CalendarInput label="" name="start-date" />
                          </div>
                        </motion.li>
                      ))}
                    </ul>

                    <AddTaskForm
                      buttonLabel="Add"
                      pendingButtonLabel="Adding..."
                      owner={username}
                      parent={task.id}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            ) : null}
          </div>
        </MotionWrapper>
      ))}
    </AnimatePresence>
  );
}
