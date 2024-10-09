"use client";

import { useFormState } from "react-dom";
import { ChevronDown, ChevronRight } from "lucide-react";

import { Task } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { updateTask } from "@/app/actions/task";
import { FORM_ACTION_RESULT } from "@/lib/constants";

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
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        aria-label={task.active ? "Collapse subtasks" : "Expand subtasks"}
        className="mr-2"
      >
        {task.active ? (
          <ChevronDown className="w-5 h-5" />
        ) : (
          <ChevronRight className="w-5 h-5" />
        )}
      </Button>
    </form>
  );
}
