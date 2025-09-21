import { useState, useMemo } from "react";
import { Task, mockTasks, taskCounts as initialTaskCounts } from "../lib/data";
import { FilterOptions } from "../components/SearchFilter";

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    status: [],
    priority: [],
    assignee: [],
  });
  const [isAdding, setIsAdding] = useState(false);

  // Filtered and searched tasks
  const filteredTasks = useMemo(() => {
    let result = tasks;

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.category.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Apply status filter
    if (filters.status.length > 0) {
      result = result.filter((task) => filters.status.includes(task.status));
    }

    // Apply priority filter
    if (filters.priority.length > 0) {
      result = result.filter((task) =>
        filters.priority.includes(task.priority),
      );
    }

    return result;
  }, [tasks, searchQuery, filters]);

  // Group tasks by status
  const tasksByStatus = useMemo(() => {
    return {
      todo: filteredTasks.filter((task) => task.status === "todo"),
      inprogress: filteredTasks.filter((task) => task.status === "inprogress"),
      done: filteredTasks.filter((task) => task.status === "done"),
    };
  }, [filteredTasks]);

  // Task counts
  const taskCounts = useMemo(() => {
    return {
      all: tasks.length,
      todo: tasks.filter((task) => task.status === "todo").length,
      inprogress: tasks.filter((task) => task.status === "inprogress").length,
      done: tasks.filter((task) => task.status === "done").length,
    };
  }, [tasks]);

  // Add new task with a short async step to enable loading UI
  const addTask = async (newTask: Partial<Task>) => {
    setIsAdding(true);
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title || "",
      category: newTask.category || "",
      progress: 0,
      totalTasks: 10,
      completedTasks: 0,
      date:
        newTask.date ||
        new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      comments: 0,
      attachments: 0,
      assignees: newTask.assignees || [],
      status: newTask.status || "todo",
      priority: newTask.priority || "medium",
    };

    await new Promise((res) => setTimeout(res, 600));
    setTasks((prev) => [...prev, task]);
    setIsAdding(false);
  };

  // Update task
  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, ...updates } : task)),
    );
  };

  // Delete task
  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  // Move task to different status
  const moveTask = (taskId: string, newStatus: Task["status"]) => {
    updateTask(taskId, { status: newStatus });
  };

  // Update task progress
  const updateProgress = (taskId: string, completedTasks: number) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      const progress = Math.round((completedTasks / task.totalTasks) * 100);
      updateTask(taskId, { completedTasks, progress });
    }
  };

  // Bulk operations
  const bulkUpdateStatus = (taskIds: string[], status: Task["status"]) => {
    setTasks((prev) =>
      prev.map((task) =>
        taskIds.includes(task.id) ? { ...task, status } : task,
      ),
    );
  };

  const duplicateTask = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      const duplicated = {
        ...task,
        id: Date.now().toString(),
        title: `${task.title} (Copy)`,
        status: "todo" as const,
        progress: 0,
        completedTasks: 0,
      };
      setTasks((prev) => [...prev, duplicated]);
    }
  };

  return {
    tasks,
    filteredTasks,
    tasksByStatus,
    taskCounts,
    searchQuery,
    filters,
    setSearchQuery,
    setFilters,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    updateProgress,
    bulkUpdateStatus,
    duplicateTask,
    isAdding,
  };
};
