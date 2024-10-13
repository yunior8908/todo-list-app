"use client";

import { motion, AnimatePresence } from "framer-motion";

import AddTaskForm from "@/components/add-task-form";
import TodoFilters from "@/components/todo-filters";
import CompleteToggleForm from "@/components/complete-toggle-form";
import DeleteTaskForm from "@/components/delete-task-form";
import ExpandTaskForm from "@/components/expand-task-form";
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
    <div className=" bg-white">
      <h1 className="text-4xl font-bold mb-8  text-gray-800">Todo List</h1>
      <TodoFilters />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <AddTaskForm
          buttonLabel="Add Task"
          pendingButtonLabel="Adding..."
          owner={username}
        />

        <AnimatePresence>
          {tasks?.map((task) => (
            <motion.div
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
                  { "bg-gray-300": task.active }
                )}
              >
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
                    <ExpandTaskForm task={task} />
                    <DeleteTaskForm task={task} />
                  </div>
                </div>
                <AnimatePresence>
                  {task.active && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-8 mt-2"
                    >
                      <ul className="space-y-2 mb-2">
                        {task?.subtasks?.map((subtask) => (
                          <motion.li
                            key={subtask.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center justify-between bg-white p-2 rounded-md shadow-sm"
                          >
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
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
