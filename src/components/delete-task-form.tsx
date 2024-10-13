"use client";

import { useFormState } from "react-dom";

import { deleteTask } from "@/app/actions/task";
import { Task } from "@/lib/types";
import { FORM_ACTION_RESULT } from "@/lib/constants";
import { SpinnerIcon, Trash2Icon } from "@/app/assets";
import SubmitButton from "./ui/submit-button";

export default function DeleteTaskForm({ task }: { task: Task }) {
  const [, dispatchDelete] = useFormState(deleteTask, FORM_ACTION_RESULT);

  return (
    <form action={dispatchDelete}>
      <input type="hidden" name="id" value={task.id} />
      <SubmitButton
        variant="ghost"
        size="icon"
        type="submit"
        aria-label="Remove subtask"
        className="text-red-500 hover:text-red-700"
      >
        {(pending) =>
          pending ? <SpinnerIcon /> : <Trash2Icon className="w-4 h-4" />
        }
      </SubmitButton>
    </form>
  );
}
