"use client";

import { useFormState } from "react-dom";
import { Trash2 } from "lucide-react";

import { deleteTask } from "@/app/actions/task";
import { Button } from "@/components/ui/button";
import { Task } from "@/lib/types";
import { FORM_ACTION_RESULT } from "@/lib/constants";

export default function DeleteTaskForm({ task }: { task: Task }) {
  const [, dispatchDelete] = useFormState(deleteTask, FORM_ACTION_RESULT);

  return (
    <form action={dispatchDelete}>
      <input type="hidden" name="id" value={task.id} />
      <Button
        variant="ghost"
        size="icon"
        type="submit"
        aria-label="Remove subtask"
        className="text-red-500 hover:text-red-700"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </form>
  );
}
