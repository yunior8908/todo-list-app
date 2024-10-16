import { createClient } from "@/lib/supabase";

import { TodoList } from "@/components/todo-list";
import { formatTasks } from "@/lib/utils";
import { FilterType, Task } from "@/lib/types";
import DeprecatedList from "@/components/deprecated-list";
import TodoFilters from "@/components/todo-filters";
import MotionWrapper from "@/components/ui/motion-wrapper";
import AddTaskForm from "@/components/add-task-form";

export default async function Home({
  searchParams,
}: {
  searchParams: { view?: string };
}) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  const filter = searchParams.view as FilterType;

  const username = data?.user?.email as string;

  const query = supabase
    .from("todo-tb")
    .select()
    .eq("owner", username)
    .eq("deprecated", false);

  if (filter === "completed") {
    query.eq("completed", true);
  }

  if (filter === "active") {
    query.eq("active", true).eq("completed", false);
  }

  if (filter === "deprecated") {
    // query.eq("deprecated", true);
  }

  query
    .order("order", { ascending: true })
    .order("created_at", { ascending: false });

  const { data: tasks } = await query.returns<Task[]>();

  const { parentTasks, deprecatedTasks } = formatTasks(tasks || []);

  const filteredTasks = parentTasks?.filter(() => {
    if (filter === "deprecated") return false;
    return true;
  });

  if (error) {
    return <p className="text-red-500 text-center">Something went wrong!</p>;
  }

  let nothingToShow = false;

  if (filter === "deprecated" && deprecatedTasks?.length === 0) {
    nothingToShow = true;
  }

  if (filter !== "deprecated" && filteredTasks?.length === 0) {
    nothingToShow = true;
  }

  return (
    <div className=" bg-white">
      <h1 className="text-4xl font-bold mb-8  text-gray-800">Todo List</h1>

      <TodoFilters />

      <MotionWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {nothingToShow ? (
          <p className="text-center text-gray-500 border border-dashed rounded-xl p-4 mb-8">
            Nothing to show here
          </p>
        ) : null}

        {filter === "all" ? (
          <AddTaskForm
            buttonLabel="Add Task"
            pendingButtonLabel="Adding..."
            owner={username}
          />
        ) : null}
        <TodoList username={username} tasks={filteredTasks} />
      </MotionWrapper>

      {filter === "deprecated" ? (
        <DeprecatedList deprecatedTasks={deprecatedTasks} />
      ) : null}
    </div>
  );
}
