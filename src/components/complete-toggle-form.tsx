"use client";

import { useFormState } from "react-dom";

import { updateTask } from "@/app/actions/task";
import { Task } from "@/lib/types";
import { FORM_ACTION_RESULT } from "@/lib/constants";
import { CheckCircle2Icon, CircleIcon, SpinnerIcon } from "@/app/assets";
import SubmitButton from "./ui/submit-button";

export default function CompleteToggleForm({ task }: { task: Task }) {
  const [, dispatchUpdate] = useFormState(updateTask, FORM_ACTION_RESULT);

  return (
    <form action={dispatchUpdate} className="flex">
      <input type="hidden" name="id" value={task.id} />
      <input
        type="hidden"
        name="completed"
        value={task.completed ? "false" : "true"}
      />
      <SubmitButton
        type="submit"
        variant="ghost"
        className="mr-2 focus:outline-none"
        aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {(pending) =>
          pending ? (
            <SpinnerIcon />
          ) : task.completed ? (
            <CheckCircle2Icon className="w-6 h-6 text-green-500" />
          ) : (
            <CircleIcon className="w-6 h-6 text-gray-400" />
          )
        }
      </SubmitButton>
    </form>
  );
}
