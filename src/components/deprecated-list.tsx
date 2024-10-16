"use client";
import { Task } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";

import CompleteToggleForm from "@/components/complete-toggle-form";
import DeleteTaskForm from "@/components/delete-task-form";
import { cn } from "@/lib/utils";

export default function DeprecatedList({
  deprecatedTasks,
}: {
  deprecatedTasks: Task[];
}) {
  return (
    <AnimatePresence>
      {deprecatedTasks?.map((task) => (
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
              "bg-gray-100 p-4 shadow-md transition-all duration-300 hover:shadow-lg opacity-40"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-start">
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
                <DeleteTaskForm task={task} />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
