import { createClient } from "@/lib/supabase";

import { TodoList } from "@/components/todo-list";
import { formatTasks } from "@/lib/utils";
import { Task } from "@/lib/types";

export default async function Home({
  searchParams,
}: {
  searchParams: { view?: string };
}) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  const filter = searchParams.view as string;

  const username = data?.user?.email as string;

  const { data: tasks } = await supabase
    .from("todo-tb")
    .select()
    .eq("owner", username)
    .order("order", { ascending: true })
    .order("created_at", { ascending: false })
    .returns<Task[]>();

  const formattedTasks = formatTasks(tasks || []);

  const filteredTasks = formattedTasks?.filter((task) => {
    if (filter === "active") return task.active && !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  if (error) {
    return <p className="text-red-500 text-center">Something went wrong!</p>;
  }

  return <TodoList username={username} tasks={filteredTasks} />;
}
