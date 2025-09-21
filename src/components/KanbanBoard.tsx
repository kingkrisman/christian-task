import React, { useState, useEffect } from "react";
import { Header, SubHeader } from "./Header";
import { KanbanColumn } from "./KanbanColumn";
import { TaskModal } from "./TaskModal";
import { SearchFilter } from "./SearchFilter";
import { TaskProgress3D } from "./TaskProgress3D";
import TaskActivity3DOverlay from "./TaskActivity3DOverlay";
import { useTaskManager } from "../hooks/useTaskManager";
import { Task } from "../lib/data";
import {
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  Filter,
  Plus,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  List,
  BarChart3,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

interface KanbanBoardProps {
  screenSize: "mobile" | "tablet" | "desktop";
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ screenSize }) => {
  const { isDark } = useTheme();
  const {
    tasksByStatus,
    taskCounts,
    filteredTasks,
    setSearchQuery,
    setFilters,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    isAdding,
  } = useTaskManager();

  const [taskModal, setTaskModal] = useState<{
    isOpen: boolean;
    mode: "create" | "edit";
    task?: Task | null;
  }>({
    isOpen: false,
    mode: "create",
    task: null,
  });

  // Enhanced state for different screen sizes
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFilters, setShowFilters] = useState(screenSize !== "mobile");
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
  const [currentColumnIndex, setCurrentColumnIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");
  const [show3DView, setShow3DView] = useState(screenSize !== "mobile");

  // Responsive column management
  const columns = [
    {
      id: "todo",
      title: "To do",
      count: taskCounts.todo,
      tasks: tasksByStatus.todo,
    },
    {
      id: "inprogress",
      title: "In progress",
      count: taskCounts.inprogress,
      tasks: tasksByStatus.inprogress,
    },
    {
      id: "done",
      title: "Done",
      count: taskCounts.done,
      tasks: tasksByStatus.done,
    },
  ];

  const visibleColumns = columns.filter(
    (col) => !hiddenColumns.includes(col.id),
  );

  // Responsive behavior based on screen size
  useEffect(() => {
    if (screenSize === "mobile") {
      setShowFilters(false);
    } else if (screenSize === "tablet") {
      setShowFilters(true);
    } else {
      setShowFilters(true);
    }
  }, [screenSize]);

  const handleCreateTask = () => {
    setTaskModal({ isOpen: true, mode: "create", task: null });
  };

  const handleEditTask = (task: Task) => {
    setTaskModal({ isOpen: true, mode: "edit", task });
  };

  const [showCelebration, setShowCelebration] = useState(false);

  const handleSaveTask = async (taskData: Partial<Task>) => {
    if (taskModal.mode === "create") {
      await addTask(taskData);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 1200);
    } else if (taskModal.task) {
      updateTask(taskModal.task.id, taskData);
    }
  };

  const handleCloseModal = () => {
    setTaskModal({ isOpen: false, mode: "create", task: null });
  };

  const toggleColumnVisibility = (columnId: string) => {
    setHiddenColumns((prev) =>
      prev.includes(columnId)
        ? prev.filter((id) => id !== columnId)
        : [...prev, columnId],
    );
  };

  const nextColumn = () => {
    setCurrentColumnIndex((prev) =>
      prev < visibleColumns.length - 1 ? prev + 1 : prev,
    );
  };

  const prevColumn = () => {
    setCurrentColumnIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "n":
            e.preventDefault();
            handleCreateTask();
            break;
          case "f":
            e.preventDefault();
            setShowFilters((prev) => !prev);
            break;
          case "3":
            e.preventDefault();
            setShow3DView((prev) => !prev);
            break;
          case "Enter":
            e.preventDefault();
            setIsFullscreen((prev) => !prev);
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  // Touch gesture handling for mobile column navigation
  useEffect(() => {
    if (screenSize !== "mobile") return;

    let startX = 0;
    let startY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!startX || !startY) return;

      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = startX - endX;
      const diffY = startY - endY;

      // Only handle horizontal swipes
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          nextColumn();
        } else {
          prevColumn();
        }
      }

      startX = 0;
      startY = 0;
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [screenSize, currentColumnIndex, visibleColumns.length]);

  return (
    <div
      className={`flex flex-col flex-1 min-h-screen transition-all duration-300 ${
        isDark ? "bg-dark-primary" : "bg-white"
      } ${isFullscreen ? "fixed inset-0 z-50" : ""} relative`}
    >
      {/* Header - Desktop/Tablet only */}
      {screenSize !== "mobile" && <Header screenSize={screenSize} />}

      {/* Enhanced Sub Header with responsive controls */}
      <div
        className={`border-b ${
          isDark
            ? "border-dark-border bg-dark-primary"
            : "border-brand-gray-200 bg-white"
        }`}
      >
        {screenSize !== "mobile" && (
          <SubHeader onCreateTask={handleCreateTask} screenSize={screenSize} />
        )}

        {/* Mobile Header */}
        {screenSize === "mobile" && (
          <div
            className={`px-4 py-3 border-b ${
              isDark ? "border-dark-border" : "border-brand-gray-100"
            }`}
          >
            <div className="flex items-center justify-between">
              <h1
                className={`text-xl font-bold ${
                  isDark ? "text-dark-text" : "text-brand-dark"
                }`}
              >
                Board View
              </h1>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShow3DView(!show3DView)}
                  className={`p-2 rounded-lg transition-colors ${
                    show3DView
                      ? isDark
                        ? "bg-dark-text text-dark-primary"
                        : "bg-brand-dark text-white"
                      : isDark
                        ? "bg-dark-accent text-dark-text hover:bg-dark-border"
                        : "bg-brand-gray-100 text-brand-dark hover:bg-brand-gray-200"
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setViewMode(viewMode === "kanban" ? "list" : "kanban")
                  }
                  className={`p-2 rounded-lg transition-colors ${
                    isDark
                      ? "bg-dark-accent hover:bg-dark-border"
                      : "bg-brand-gray-100 hover:bg-brand-gray-200"
                  }`}
                >
                  {viewMode === "kanban" ? (
                    <List
                      className={`w-4 h-4 ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                    />
                  ) : (
                    <Grid3X3
                      className={`w-4 h-4 ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                    />
                  )}
                </button>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`p-2 rounded-lg transition-colors ${
                    showFilters
                      ? isDark
                        ? "bg-dark-text text-dark-primary"
                        : "bg-brand-dark text-white"
                      : isDark
                        ? "bg-dark-accent text-dark-text hover:bg-dark-border"
                        : "bg-brand-gray-100 text-brand-dark hover:bg-brand-gray-200"
                  }`}
                >
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Additional Controls */}
        {screenSize !== "mobile" && (
          <div
            className={`px-4 lg:px-8 pb-4 ${screenSize === "tablet" ? "px-4" : ""}`}
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              {/* View Controls */}
              <div className="flex items-center space-x-2 lg:space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    showFilters
                      ? isDark
                        ? "bg-dark-text text-dark-primary"
                        : "bg-brand-dark text-white"
                      : isDark
                        ? "bg-dark-accent text-dark-text hover:bg-dark-border"
                        : "bg-brand-gray-100 text-brand-dark hover:bg-brand-gray-200"
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  {screenSize === "desktop" && (
                    <span className="text-sm font-medium">Filters</span>
                  )}
                </button>

                <button
                  onClick={() => setShow3DView(!show3DView)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    show3DView
                      ? isDark
                        ? "bg-dark-text text-dark-primary"
                        : "bg-brand-dark text-white"
                      : isDark
                        ? "bg-dark-accent text-dark-text hover:bg-dark-border"
                        : "bg-brand-gray-100 text-brand-dark hover:bg-brand-gray-200"
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  {screenSize === "desktop" && (
                    <span className="text-sm font-medium">3D View</span>
                  )}
                </button>

                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    isDark
                      ? "bg-dark-accent text-dark-text hover:bg-dark-border"
                      : "bg-brand-gray-100 text-brand-dark hover:bg-brand-gray-200"
                  }`}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                  {screenSize === "desktop" && (
                    <span className="text-sm font-medium">
                      {isFullscreen ? "Exit" : "Focus"}
                    </span>
                  )}
                </button>

                {/* Column Visibility Toggles - Desktop only */}
                {screenSize === "desktop" && (
                  <div className="flex items-center space-x-2">
                    {columns.map((column) => (
                      <button
                        key={column.id}
                        onClick={() => toggleColumnVisibility(column.id)}
                        className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                          hiddenColumns.includes(column.id)
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {hiddenColumns.includes(column.id) ? (
                          <EyeOff className="w-3 h-3" />
                        ) : (
                          <Eye className="w-3 h-3" />
                        )}
                        <span>{column.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div
                className={`flex items-center space-x-2 lg:space-x-4 text-xs lg:text-sm ${
                  isDark ? "text-dark-text-secondary" : "text-brand-dark/60"
                }`}
              >
                <span>{filteredTasks.length} total tasks</span>
                <span>•</span>
                <span>{taskCounts.done} completed</span>
                <span>•</span>
                <span>
                  {Math.round((taskCounts.done / filteredTasks.length) * 100) ||
                    0}
                  % done
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search and Filter */}
      {showFilters && (
        <div
          className={`border-b ${
            isDark
              ? "border-dark-border bg-dark-accent-light"
              : "border-brand-gray-100 bg-brand-gray-50"
          }`}
        >
          <div className={`p-4 lg:p-6 ${screenSize === "mobile" ? "p-3" : ""}`}>
            <SearchFilter
              onSearch={setSearchQuery}
              onFilter={setFilters}
              totalTasks={filteredTasks.length}
              screenSize={screenSize}
            />
          </div>
        </div>
      )}

      {/* Mobile Column Navigation */}
      {screenSize === "mobile" && viewMode === "kanban" && (
        <div
          className={`border-b px-4 py-3 ${
            isDark
              ? "border-dark-border bg-dark-primary"
              : "border-brand-gray-200 bg-white"
          }`}
        >
          <div className="flex items-center justify-between">
            <button
              onClick={prevColumn}
              disabled={currentColumnIndex === 0}
              className={`p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
                isDark
                  ? "bg-dark-accent hover:bg-dark-border"
                  : "bg-brand-gray-100 hover:bg-brand-gray-200"
              }`}
            >
              <ChevronLeft
                className={`w-4 h-4 ${isDark ? "text-dark-text" : "text-brand-dark"}`}
              />
            </button>

            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {visibleColumns.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentColumnIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentColumnIndex
                        ? "bg-brand-dark"
                        : "bg-brand-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div className="text-center ml-4">
                <span
                  className={`text-lg font-bold ${
                    isDark ? "text-dark-text" : "text-brand-dark"
                  }`}
                >
                  {visibleColumns[currentColumnIndex]?.title}
                </span>
                <span
                  className={`ml-2 text-sm ${
                    isDark ? "text-dark-text-secondary" : "text-brand-dark/60"
                  }`}
                >
                  ({visibleColumns[currentColumnIndex]?.count})
                </span>
              </div>
            </div>

            <button
              onClick={nextColumn}
              disabled={currentColumnIndex === visibleColumns.length - 1}
              className={`p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
                isDark
                  ? "bg-dark-accent hover:bg-dark-border"
                  : "bg-brand-gray-100 hover:bg-brand-gray-200"
              }`}
            >
              <ChevronRight
                className={`w-4 h-4 ${isDark ? "text-dark-text" : "text-brand-dark"}`}
              />
            </button>
          </div>
        </div>
      )}

      {/* 3D Progress View */}
      {show3DView && screenSize !== "mobile" && (
        <div className={`p-4 lg:p-6 ${screenSize === "tablet" ? "p-3" : ""}`}>
          <TaskProgress3D taskCounts={taskCounts} className="mb-6" />
        </div>
      )}

      {/* Kanban Board Content */}
      <div className="flex-1">
        {/* Desktop/Tablet View */}
        {screenSize !== "mobile" && (
          <div
            className={`min-h-screen ${
              screenSize === "tablet" ? "p-3" : "p-4 lg:p-6"
            }`}
          >
            <div className="flex gap-4 lg:gap-6 overflow-x-auto min-h-[calc(100vh-200px)]">
              {columns.map(
                (column) =>
                  !hiddenColumns.includes(column.id) && (
                    <KanbanColumn
                      key={column.id}
                      title={column.title}
                      count={column.count}
                      tasks={column.tasks}
                      status={column.id as Task["status"]}
                      onEditTask={handleEditTask}
                      onDeleteTask={deleteTask}
                      onMoveTask={moveTask}
                      onCreateTask={handleCreateTask}
                      screenSize={screenSize}
                    />
                  ),
              )}
            </div>
          </div>
        )}

        {/* Mobile View */}
        {screenSize === "mobile" && (
          <div className="flex-1">
            {/* 3D Progress View for Mobile */}
            {show3DView && (
              <div className="p-4">
                <TaskProgress3D taskCounts={taskCounts} className="mb-4" />
              </div>
            )}

            {viewMode === "kanban" ? (
              // Single Column View
              <div className="min-h-[calc(100vh-180px)] p-4">
                {visibleColumns[currentColumnIndex] && (
                  <KanbanColumn
                    title={visibleColumns[currentColumnIndex].title}
                    count={visibleColumns[currentColumnIndex].count}
                    tasks={visibleColumns[currentColumnIndex].tasks}
                    status={
                      visibleColumns[currentColumnIndex].id as Task["status"]
                    }
                    onEditTask={handleEditTask}
                    onDeleteTask={deleteTask}
                    onMoveTask={moveTask}
                    onCreateTask={handleCreateTask}
                    screenSize={screenSize}
                  />
                )}
              </div>
            ) : (
              // List View
              <div className="min-h-screen overflow-y-auto p-4">
                <div className="space-y-4">
                  {filteredTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                        isDark
                          ? "bg-dark-card border-dark-border"
                          : "bg-white border-brand-gray-200"
                      }`}
                      onClick={() => handleEditTask(task)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3
                          className={`text-sm font-semibold ${
                            isDark ? "text-dark-text" : "text-brand-dark"
                          }`}
                        >
                          {task.title}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            task.status === "todo"
                              ? "bg-blue-100 text-blue-700"
                              : task.status === "inprogress"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-green-100 text-green-700"
                          }`}
                        >
                          {task.status === "inprogress"
                            ? "In Progress"
                            : task.status.charAt(0).toUpperCase() +
                              task.status.slice(1)}
                        </span>
                      </div>
                      <p
                        className={`text-xs mb-3 ${
                          isDark
                            ? "text-dark-text-secondary"
                            : "text-brand-dark/60"
                        }`}
                      >
                        {task.category}
                      </p>
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs ${
                            isDark
                              ? "text-dark-text-secondary"
                              : "text-brand-dark/60"
                          }`}
                        >
                          {task.date}
                        </span>
                        <div className="flex items-center space-x-2">
                          {task.assignees.slice(0, 2).map((user) => (
                            <div
                              key={user.id}
                              className="w-6 h-6 rounded-full overflow-hidden"
                            >
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                          {task.assignees.length > 2 && (
                            <span
                              className={`text-xs ${
                                isDark
                                  ? "text-dark-text-secondary"
                                  : "text-brand-dark/60"
                              }`}
                            >
                              +{task.assignees.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Action Button for Mobile */}
      <button
        onClick={handleCreateTask}
        className={`md:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-40 transition-colors active:scale-95 ${
          isDark
            ? "bg-dark-text text-dark-primary hover:bg-dark-text/90"
            : "bg-brand-dark text-white hover:bg-brand-dark/90"
        }`}
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Keyboard Shortcuts Help - Desktop only */}
      {isFullscreen && screenSize === "desktop" && (
        <div className="absolute top-4 right-4 bg-black/80 text-white text-xs rounded-lg p-3 space-y-1">
          <div>
            <kbd className="bg-white/20 px-1 rounded">Ctrl+N</kbd> New Task
          </div>
          <div>
            <kbd className="bg-white/20 px-1 rounded">Ctrl+F</kbd> Toggle
            Filters
          </div>
          <div>
            <kbd className="bg-white/20 px-1 rounded">Ctrl+3</kbd> Toggle 3D
            View
          </div>
          <div>
            <kbd className="bg-white/20 px-1 rounded">Ctrl+Enter</kbd> Exit
            Focus
          </div>
        </div>
      )}

      {/* Overlays */}
      {isAdding && <TaskActivity3DOverlay mode="loading" isDark={isDark} />}
      {showCelebration && !isAdding && (
        <TaskActivity3DOverlay
          mode="success"
          isDark={isDark}
          onDone={() => setShowCelebration(false)}
        />
      )}

      {/* Task Modal */}
      <TaskModal
        isOpen={taskModal.isOpen}
        onClose={handleCloseModal}
        task={taskModal.task}
        onSave={handleSaveTask}
        mode={taskModal.mode}
        screenSize={screenSize}
      />
    </div>
  );
};
