"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { FilterType } from "@/lib/types";

export default function TodoFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const view = (searchParams.get("view") || "active") as FilterType;

  const setFilter = (filter: FilterType) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("view", filter);
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex space-x-4 mb-6">
        <Button
          onClick={() => setFilter("all")}
          variant={view === "all" ? "default" : "outline"}
        >
          All
        </Button>
        <Button
          onClick={() => setFilter("active")}
          variant={view === "active" ? "default" : "outline"}
        >
          Active
        </Button>
        <Button
          onClick={() => setFilter("completed")}
          variant={view === "completed" ? "default" : "outline"}
        >
          Completed
        </Button>
      </div>
    </motion.div>
  );
}
