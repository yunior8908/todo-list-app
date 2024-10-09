"use client";
import { useRef } from "react";
import { useFormState } from "react-dom";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createTask } from "@/app/actions/task";
import { FORM_ACTION_RESULT } from "@/lib/constants";

export default function AddTaskForm({
  buttonLabel,
  owner,
  parent,
}: {
  buttonLabel: string;
  owner: string;
  parent?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [, dispatch] = useFormState(
    async (prev: object, formData: FormData) => {
      const result = await createTask(prev, formData);
      formRef.current?.reset();
      return result;
    },
    FORM_ACTION_RESULT
  );

  return (
    <form ref={formRef} action={dispatch} className="flex mb-6">
      <input type="hidden" name="owner" value={owner} />
      <input type="hidden" name="parent" value={parent} />
      <Input
        type="text"
        name="text"
        placeholder="Add a new task"
        className="mr-4 flex-grow"
      />
      <Button
        type="submit"
        className="bg-black text-white font-bold py-2 px-4 rounded transition-all duration-300"
      >
        <Plus className="w-5 h-5 mr-2" />
        {buttonLabel}
      </Button>
    </form>
  );
}
