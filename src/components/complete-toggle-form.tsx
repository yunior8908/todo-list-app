"use client";

import { useFormState } from "react-dom";
import { CheckCircle2, Circle } from "lucide-react";

import { updateTask } from "@/app/actions/task";
import { Task } from "@/lib/types";
import { FORM_ACTION_RESULT } from "@/lib/constants";

export default function CompleteToggleForm({ task }: { task: Task }) {
  const [, dispatchUpdate] = useFormState(updateTask, FORM_ACTION_RESULT);

  return (
    <form action={dispatchUpdate}>
      <input type="hidden" name="id" value={task.id} />
      <input
        type="hidden"
        name="completed"
        value={task.completed ? "false" : "true"}
      />
      <button
        type="submit"
        className="mr-2 focus:outline-none"
        aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {task.completed ? (
          <CheckCircle2 className="w-6 h-6 text-green-500" />
        ) : (
          <Circle className="w-6 h-6 text-gray-400" />
        )}
      </button>
    </form>
  );
}
