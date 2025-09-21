import React, { useState } from "react";
import { LeftSidebar } from "../components/LeftSidebar";
import { useTheme } from "../contexts/ThemeContext";
import { useTaskManager } from "../hooks/useTaskManager";
import { TaskModal } from "../components/TaskModal";
import TaskActivity3DOverlay from "../components/TaskActivity3DOverlay";
import { Task } from "../lib/data";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  MessageCircle,
  Paperclip,
  Flag,
  Clock,
  CheckCircle,
  Circle,
  AlertCircle,
  Edit,
  Trash2,
  Copy,
  User,
} from "lucide-react";

export default function Tasks() {
  const { isDark } = useTheme();
  const {
    filteredTasks,
    setSearchQuery,
    setFilters,
    addTask,
    updateTask,
    deleteTask,
    filters,
    searchQuery,
    isAdding,
  } = useTaskManager();

  const [viewMode, setViewMode] = useState<"list" | "board">("list");
  const [taskModal, setTaskModal] = useState<{
    isOpen: boolean;
    mode: "create" | "edit";
    task?: Task | null;
  }>({
    isOpen: false,
    mode: "create",
    task: null,
  });
  const [activeTaskMenu, setActiveTaskMenu] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"date" | "priority" | "progress">(
    "date",
  );
  const [showCelebration, setShowCelebration] = useState(false);

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "priority":
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case "progress":
        return b.progress - a.progress;
      default:
        return 0;
    }
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100 border-red-200";
      case "medium":
        return "text-yellow-600 bg-yellow-100 border-yellow-200";
      case "low":
        return "text-green-600 bg-green-100 border-green-200";
      default:
        return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo":
        return "text-blue-600 bg-blue-100 border-blue-200";
      case "inprogress":
        return "text-orange-600 bg-orange-100 border-orange-200";
      case "done":
        return "text-green-600 bg-green-100 border-green-200";
      default:
        return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "todo":
        return <Circle className="w-4 h-4" />;
      case "inprogress":
        return <Clock className="w-4 h-4" />;
      case "done":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleCreateTask = () => {
    setTaskModal({ isOpen: true, mode: "create", task: null });
  };

  const handleEditTask = (task: Task) => {
    setTaskModal({ isOpen: true, mode: "edit", task });
    setActiveTaskMenu(null);
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask(taskId);
      setActiveTaskMenu(null);
    }
  };

  const handleDuplicateTask = async (task: Task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      title: `${task.title} (Copy)`,
    };
    await addTask(newTask);
    setActiveTaskMenu(null);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 1200);
  };

  const handleSaveTask = async (taskData: any) => {
    if (taskModal.mode === "create") {
      await addTask({
        ...taskData,
        id: Date.now().toString(),
        date: new Date().toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      });
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 1200);
    } else if (taskModal.task) {
      updateTask(taskModal.task.id, taskData);
    }
    setTaskModal({ isOpen: false, mode: "create", task: null });
  };

  return (
    <div
      className={`flex w-full min-h-screen ${isDark ? "bg-dark-primary" : "bg-white"} relative`}
    >
      <LeftSidebar screenSize="desktop" />

      {isAdding && <TaskActivity3DOverlay mode="loading" isDark={isDark} />}
      {showCelebration && !isAdding && (
        <TaskActivity3DOverlay
          mode="success"
          isDark={isDark}
          onDone={() => setShowCelebration(false)}
        />
      )}

      <div className="flex-1 ml-[90px] p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1
                className={`text-3xl font-bold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
              >
                Tasks
              </h1>
              <p
                className={`text-sm ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"} mt-1`}
              >
                Track and manage all your tasks
              </p>
            </div>
            <button
              onClick={handleCreateTask}
              className="flex items-center space-x-2 px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>New Task</span>
            </button>
          </div>

          {/* Filters and Controls */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                    isDark ? "text-dark-text-secondary" : "text-brand-dark/40"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors ${
                    isDark
                      ? "bg-dark-accent border-dark-border text-dark-text placeholder-dark-text-secondary"
                      : "bg-white border-brand-gray-200 text-brand-dark placeholder-brand-dark/40"
                  }`}
                />
              </div>

              {/* Status Filter */}
              <select
                value={filters.status.length === 1 ? filters.status[0] : "all"}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    status:
                      e.target.value === "all" ? [] : [e.target.value as any],
                  })
                }
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  isDark
                    ? "bg-dark-accent border-dark-border text-dark-text"
                    : "bg-white border-brand-gray-200 text-brand-dark"
                }`}
              >
                <option value="all">All Status</option>
                <option value="todo">To Do</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
              </select>

              {/* Priority Filter */}
              <select
                value={
                  filters.priority.length === 1 ? filters.priority[0] : "all"
                }
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    priority:
                      e.target.value === "all" ? [] : [e.target.value as any],
                  })
                }
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  isDark
                    ? "bg-dark-accent border-dark-border text-dark-text"
                    : "bg-white border-brand-gray-200 text-brand-dark"
                }`}
              >
                <option value="all">All Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  isDark
                    ? "bg-dark-accent border-dark-border text-dark-text"
                    : "bg-white border-brand-gray-200 text-brand-dark"
                }`}
              >
                <option value="date">Sort by Date</option>
                <option value="priority">Sort by Priority</option>
                <option value="progress">Sort by Progress</option>
              </select>
            </div>
          </div>
        </div>

        {/* Task Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div
            className={`p-4 rounded-xl border ${
              isDark
                ? "bg-dark-card border-dark-border"
                : "bg-white border-brand-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-medium ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                >
                  Total Tasks
                </p>
                <p
                  className={`text-2xl font-bold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                >
                  {filteredTasks.length}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Circle className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark
                ? "bg-dark-card border-dark-border"
                : "bg-white border-brand-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-medium ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                >
                  In Progress
                </p>
                <p
                  className={`text-2xl font-bold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                >
                  {
                    filteredTasks.filter((t) => t.status === "inprogress")
                      .length
                  }
                </p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark
                ? "bg-dark-card border-dark-border"
                : "bg-white border-brand-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-medium ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                >
                  Completed
                </p>
                <p
                  className={`text-2xl font-bold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                >
                  {filteredTasks.filter((t) => t.status === "done").length}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark
                ? "bg-dark-card border-dark-border"
                : "bg-white border-brand-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-medium ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                >
                  High Priority
                </p>
                <p
                  className={`text-2xl font-bold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                >
                  {filteredTasks.filter((t) => t.priority === "high").length}
                </p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Flag className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div
          className={`rounded-xl border ${
            isDark
              ? "bg-dark-card border-dark-border"
              : "bg-white border-brand-gray-200"
          }`}
        >
          {/* Table Header */}
          <div
            className={`grid grid-cols-12 gap-4 p-4 border-b font-medium text-sm ${
              isDark
                ? "border-dark-border text-dark-text-secondary"
                : "border-brand-gray-200 text-brand-dark/60"
            }`}
          >
            <div className="col-span-4">Task</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1">Priority</div>
            <div className="col-span-1">Progress</div>
            <div className="col-span-2">Due Date</div>
            <div className="col-span-1">Assignees</div>
            <div className="col-span-1">Actions</div>
          </div>

          {/* Tasks Rows */}
          {sortedTasks.map((task) => (
            <div
              key={task.id}
              className={`grid grid-cols-12 gap-4 p-4 border-b last:border-b-0 transition-colors group ${
                isDark
                  ? "border-dark-border hover:bg-dark-accent"
                  : "border-brand-gray-100 hover:bg-brand-gray-50"
              }`}
            >
              {/* Task Info */}
              <div className="col-span-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(task.status)}
                  </div>
                  <div className="min-w-0">
                    <h3
                      className={`font-medium truncate ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                    >
                      {task.title}
                    </h3>
                    <p
                      className={`text-sm truncate ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                    >
                      {task.category}
                    </p>
                    <div className="flex items-center space-x-3 mt-1">
                      {task.comments > 0 && (
                        <div className="flex items-center space-x-1">
                          <MessageCircle
                            className={`w-3 h-3 ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                          />
                          <span
                            className={`text-xs ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                          >
                            {task.comments}
                          </span>
                        </div>
                      )}
                      {task.attachments > 0 && (
                        <div className="flex items-center space-x-1">
                          <Paperclip
                            className={`w-3 h-3 ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                          />
                          <span
                            className={`text-xs ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                          >
                            {task.attachments}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="col-span-2 flex items-center">
                <span
                  className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}
                >
                  {getStatusIcon(task.status)}
                  <span className="capitalize">
                    {task.status.replace("inprogress", "in progress")}
                  </span>
                </span>
              </div>

              {/* Priority */}
              <div className="col-span-1 flex items-center">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}
                >
                  <Flag className="w-3 h-3 mr-1" />
                  <span className="capitalize">{task.priority}</span>
                </span>
              </div>

              {/* Progress */}
              <div className="col-span-1 flex items-center">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-xs ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                    >
                      {task.progress}%
                    </span>
                  </div>
                  <div
                    className={`w-full bg-gray-200 rounded-full h-2 ${isDark ? "bg-dark-border" : "bg-brand-gray-200"}`}
                  >
                    <div
                      className="bg-brand-blue h-2 rounded-full transition-all"
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Due Date */}
              <div className="col-span-2 flex items-center">
                <div className="flex items-center space-x-2">
                  <Calendar
                    className={`w-4 h-4 ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                  />
                  <span
                    className={`text-sm ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                  >
                    {task.date}
                  </span>
                </div>
              </div>

              {/* Assignees */}
              <div className="col-span-1 flex items-center">
                <div className="flex -space-x-2">
                  {task.assignees.slice(0, 3).map((assignee, index) => (
                    <img
                      key={assignee.id}
                      src={assignee.avatar}
                      alt={assignee.name}
                      className="w-6 h-6 rounded-full border-2 border-white"
                      title={assignee.name}
                    />
                  ))}
                  {task.assignees.length > 3 && (
                    <div
                      className={`w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium ${
                        isDark
                          ? "bg-dark-accent text-dark-text"
                          : "bg-brand-gray-200 text-brand-dark"
                      }`}
                    >
                      +{task.assignees.length - 3}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="col-span-1 flex items-center relative">
                <button
                  onClick={() =>
                    setActiveTaskMenu(
                      activeTaskMenu === task.id ? null : task.id,
                    )
                  }
                  className={`opacity-0 group-hover:opacity-100 p-1 rounded transition-all ${
                    isDark ? "hover:bg-dark-border" : "hover:bg-brand-gray-200"
                  }`}
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>

                {activeTaskMenu === task.id && (
                  <div
                    className={`absolute right-0 top-full mt-1 w-48 border rounded-lg shadow-lg z-50 py-1 ${
                      isDark
                        ? "bg-dark-card border-dark-border"
                        : "bg-white border-brand-gray-200"
                    }`}
                  >
                    <button
                      onClick={() => handleEditTask(task)}
                      className={`w-full flex items-center space-x-2 px-3 py-2 text-sm transition-colors ${
                        isDark
                          ? "text-dark-text hover:bg-dark-accent"
                          : "text-brand-dark hover:bg-brand-gray-50"
                      }`}
                    >
                      <Edit className="w-3 h-3" />
                      <span>Edit Task</span>
                    </button>
                    <button
                      onClick={() => handleDuplicateTask(task)}
                      className={`w-full flex items-center space-x-2 px-3 py-2 text-sm transition-colors ${
                        isDark
                          ? "text-dark-text hover:bg-dark-accent"
                          : "text-brand-dark hover:bg-brand-gray-50"
                      }`}
                    >
                      <Copy className="w-3 h-3" />
                      <span>Duplicate</span>
                    </button>
                    <div
                      className={`border-t my-1 ${isDark ? "border-dark-border" : "border-brand-gray-100"}`}
                    />
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Delete Task</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedTasks.length === 0 && (
          <div className="text-center py-12">
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                isDark ? "bg-dark-accent" : "bg-brand-gray-100"
              }`}
            >
              <CheckCircle
                className={`w-8 h-8 ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
              />
            </div>
            <h3
              className={`text-lg font-medium mb-2 ${isDark ? "text-dark-text" : "text-brand-dark"}`}
            >
              No tasks found
            </h3>
            <p
              className={`${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"} mb-4`}
            >
              {searchQuery || Object.values(filters).some((f) => f)
                ? "Try adjusting your filters"
                : "Get started by creating your first task"}
            </p>
            {!searchQuery && !Object.values(filters).some((f) => f) && (
              <button
                onClick={handleCreateTask}
                className="px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 transition-colors"
              >
                Create Task
              </button>
            )}
          </div>
        )}
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={taskModal.isOpen}
        onClose={() =>
          setTaskModal({ isOpen: false, mode: "create", task: null })
        }
        task={taskModal.task}
        onSave={handleSaveTask}
        mode={taskModal.mode}
        screenSize="desktop"
      />

      {/* Click outside handler */}
      {activeTaskMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setActiveTaskMenu(null)}
        />
      )}
    </div>
  );
}
