"use client";

import { useFormState } from "react-dom";

import { Task } from "@/lib/types";
import { updateTask } from "@/app/actions/task";
import { FORM_ACTION_RESULT } from "@/lib/constants";
import SubmitButton from "./ui/submit-button";
import { ChevronDownIcon, ChevronRightIcon, SpinnerIcon } from "@/app/assets";

export default function ExpandTaskForm({ task }: { task: Task }) {
  const [, dispatchUpdate] = useFormState(updateTask, FORM_ACTION_RESULT);

  return (
    <form action={dispatchUpdate}>
      <input type="hidden" name="id" value={task.id} />
      <input
        type="hidden"
        name="active"
        value={task.active ? "false" : "true"}
      />
      <SubmitButton
        type="submit"
        variant="ghost"
        size="icon"
        aria-label={task.active ? "Collapse subtasks" : "Expand subtasks"}
      >
        {(pending) =>
          pending ? (
            <SpinnerIcon />
          ) : task.active ? (
            <ChevronDownIcon className="w-5 h-5" />
          ) : (
            <ChevronRightIcon className="w-5 h-5" />
          )
        }
      </SubmitButton>
    </form>
  );
}
