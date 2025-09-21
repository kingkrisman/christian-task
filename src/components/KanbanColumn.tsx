import React, { useState, useRef, useEffect } from "react";
import { Plus, MoreVertical, ArrowUp, ArrowDown, Grip } from "lucide-react";
import { TaskCard } from "./TaskCard";
import { Task } from "../lib/data";
import { useTheme } from "../contexts/ThemeContext";

interface KanbanColumnProps {
  title: string;
  count: number;
  tasks: Task[];
  status: "todo" | "inprogress" | "done";
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onMoveTask: (taskId: string, newStatus: Task["status"]) => void;
  onCreateTask: () => void;
  screenSize: "mobile" | "tablet" | "desktop";
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  count,
  tasks,
  status,
  onEditTask,
  onDeleteTask,
  onMoveTask,
  onCreateTask,
  screenSize,
}) => {
  const { isDark } = useTheme();
  const [isDragOver, setIsDragOver] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Check scroll position to show/hide scroll indicators
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        scrollContainerRef.current;
      setCanScrollUp(scrollTop > 0);
      setCanScrollDown(scrollTop < scrollHeight - clientHeight - 1);
      setShowScrollIndicator(scrollHeight > clientHeight);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      return () => container.removeEventListener("scroll", checkScrollPosition);
    }
  }, [tasks]);

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    scrollContainerRef.current?.scrollTo({
      top: scrollContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const taskId =
      e.dataTransfer.getData("taskId") || e.dataTransfer.getData("text/plain");
    if (taskId) {
      onMoveTask(taskId, status);
    }
  };

  const getColumnStatusColor = () => {
    switch (status) {
      case "todo":
        return isDark
          ? "border-blue-500/50 bg-blue-500/10"
          : "border-blue-200 bg-blue-50/30";
      case "inprogress":
        return isDark
          ? "border-orange-500/50 bg-orange-500/10"
          : "border-orange-200 bg-orange-50/30";
      case "done":
        return isDark
          ? "border-green-500/50 bg-green-500/10"
          : "border-green-200 bg-green-50/30";
      default:
        return isDark ? "border-dark-border" : "border-brand-gray-200";
    }
  };

  const getEmptyStateMessage = () => {
    switch (status) {
      case "todo":
        return screenSize === "mobile"
          ? "Add your first task"
          : "Add your first task";
      case "inprogress":
        return screenSize === "mobile"
          ? "Move tasks here"
          : "Move tasks here to work on them";
      case "done":
        return screenSize === "mobile"
          ? "Completed tasks"
          : "Drag your completed tasks here...";
      default:
        return "No tasks yet";
    }
  };

  const getColumnWidth = () => {
    switch (screenSize) {
      case "mobile":
        return "w-full";
      case "tablet":
        return "w-[280px] min-w-[280px]";
      case "desktop":
        return "w-[352px] min-w-[320px]";
      default:
        return "w-[352px] min-w-[320px]";
    }
  };

  const getColumnPadding = () => {
    switch (screenSize) {
      case "mobile":
        return "p-3";
      case "tablet":
        return "p-3";
      case "desktop":
        return "p-4";
      default:
        return "p-4";
    }
  };

  const getHeaderSpacing = () => {
    switch (screenSize) {
      case "mobile":
        return "px-3 py-4";
      case "tablet":
        return "px-3 py-4";
      case "desktop":
        return "px-4 py-5";
      default:
        return "px-4 py-5";
    }
  };

  return (
    <div
      className={`${getColumnWidth()} flex-shrink-0 ${screenSize === "mobile" ? "h-full" : "min-h-[600px]"} flex flex-col`}
    >
      {/* Column Container */}
      <div
        className={`relative flex-1 rounded-xl border-2 border-dashed transition-all duration-200 flex flex-col ${
          isDark ? "bg-dark-tertiary" : "bg-white"
        } ${
          isDragOver
            ? `${isDark ? "border-dark-text shadow-lg" : "border-brand-dark shadow-lg"} ${getColumnStatusColor()}`
            : isDark
              ? "border-dark-border hover:border-dark-text/30"
              : "border-brand-gray-200 hover:border-brand-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Column Header */}
        <div
          className={`sticky top-0 z-10 rounded-t-xl border-b ${
            isDark
              ? "bg-dark-tertiary border-dark-border"
              : "bg-white border-brand-gray-100"
          } ${getHeaderSpacing()}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* Mobile drag handle */}
              {screenSize === "mobile" && (
                <Grip
                  className={`w-4 h-4 ${
                    isDark ? "text-dark-text-muted" : "text-brand-dark/30"
                  }`}
                />
              )}
              <span
                className={`font-semibold ${
                  isDark ? "text-dark-text-secondary" : "text-brand-dark/50"
                } ${screenSize === "mobile" ? "text-sm" : "text-sm"}`}
              >
                {title} ({count})
              </span>
              {count > 0 && (
                <div
                  className={`w-2 h-2 rounded-full ${
                    status === "todo"
                      ? "bg-blue-400"
                      : status === "inprogress"
                        ? "bg-orange-400"
                        : "bg-green-400"
                  }`}
                />
              )}
            </div>

            <div className="flex items-center space-x-2">
              {/* Column Menu - Desktop/Tablet only */}
              {screenSize !== "mobile" && (
                <button
                  className={`p-1 rounded-md transition-colors ${
                    isDark ? "hover:bg-dark-accent" : "hover:bg-brand-gray-100"
                  }`}
                >
                  <MoreVertical
                    className={`w-4 h-4 ${
                      isDark ? "text-dark-text-secondary" : "text-brand-dark/40"
                    }`}
                  />
                </button>
              )}

              {/* Add Task Button */}
              <button
                onClick={onCreateTask}
                className={`flex items-center space-x-2 rounded-lg transition-colors group ${
                  isDark ? "hover:bg-dark-accent" : "hover:bg-brand-gray-50"
                } ${screenSize === "mobile" ? "px-2 py-1" : "px-2 py-1"}`}
              >
                <div
                  className={`rounded-full flex items-center justify-center transition-colors ${
                    isDark
                      ? "bg-dark-border group-hover:bg-dark-text"
                      : "bg-brand-gray-200 group-hover:bg-brand-dark"
                  } ${screenSize === "mobile" ? "w-4 h-4" : "w-[18px] h-[18px]"}`}
                >
                  <Plus
                    className={`${
                      isDark
                        ? "text-dark-text-secondary group-hover:text-dark-primary"
                        : "text-brand-dark/40 group-hover:text-white"
                    } ${screenSize === "mobile" ? "w-2.5 h-2.5" : "w-3 h-3"}`}
                    strokeWidth={2}
                  />
                </div>
                {screenSize === "desktop" && (
                  <span
                    className={`text-sm font-semibold transition-colors ${
                      isDark
                        ? "text-dark-text group-hover:text-dark-text/80"
                        : "text-brand-dark group-hover:text-brand-dark/80"
                    }`}
                  >
                    Add new task
                  </span>
                )}
                {screenSize === "tablet" && (
                  <span
                    className={`text-xs font-medium transition-colors ${
                      isDark
                        ? "text-dark-text group-hover:text-dark-text/80"
                        : "text-brand-dark group-hover:text-brand-dark/80"
                    }`}
                  >
                    Add
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Progress Indicator for Column */}
          {count > 0 && (
            <div className={`${screenSize === "mobile" ? "mt-2" : "mt-3"}`}>
              <div
                className={`w-full h-1 rounded-full overflow-hidden ${
                  isDark ? "bg-dark-border" : "bg-brand-gray-200"
                }`}
              >
                <div
                  className={`h-full transition-all duration-500 ${
                    status === "todo"
                      ? "bg-blue-400"
                      : status === "inprogress"
                        ? "bg-orange-400"
                        : "bg-green-400"
                  }`}
                  style={{
                    width: `${Math.min((count / 10) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Scroll Indicators - Desktop/Tablet only */}
        {showScrollIndicator && screenSize !== "mobile" && (
          <>
            {canScrollUp && (
              <button
                onClick={scrollToTop}
                className={`absolute top-16 right-2 z-20 w-8 h-8 shadow-md rounded-full flex items-center justify-center transition-colors ${
                  isDark
                    ? "bg-dark-card hover:bg-dark-border"
                    : "bg-white hover:bg-brand-gray-50"
                }`}
              >
                <ArrowUp
                  className={`w-4 h-4 ${
                    isDark ? "text-dark-text-secondary" : "text-brand-dark/60"
                  }`}
                />
              </button>
            )}
            {canScrollDown && (
              <button
                onClick={scrollToBottom}
                className={`absolute bottom-4 right-2 z-20 w-8 h-8 shadow-md rounded-full flex items-center justify-center transition-colors ${
                  isDark
                    ? "bg-dark-card hover:bg-dark-border"
                    : "bg-white hover:bg-brand-gray-50"
                }`}
              >
                <ArrowDown
                  className={`w-4 h-4 ${
                    isDark ? "text-dark-text-secondary" : "text-brand-dark/60"
                  }`}
                />
              </button>
            )}
          </>
        )}

        {/* Tasks Container with Proper Overflow */}
        <div
          ref={scrollContainerRef}
          className={`flex-1 ${screenSize === "mobile" ? "overflow-y-auto" : "max-h-[calc(100vh-300px)] overflow-y-auto"} overflow-x-hidden ${getColumnPadding()}`}
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: isDark
              ? "rgba(255, 255, 255, 0.2) transparent"
              : "rgba(28, 29, 34, 0.12) transparent",
          }}
        >
          {/* Task Cards */}
          <div
            className={`space-y-3 ${screenSize === "mobile" ? "space-y-2" : ""}`}
          >
            {tasks.map((task, index) => (
              <div
                key={task.id}
                className="animate-task-enter"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TaskCard
                  task={task}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                  onMove={onMoveTask}
                  screenSize={screenSize}
                />
              </div>
            ))}

            {/* Empty State with Drag Target */}
            {tasks.length === 0 && (
              <div
                className={`h-full min-h-[120px] flex flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all duration-300 ${
                  isDragOver
                    ? isDark
                      ? "border-dark-text bg-dark-accent"
                      : "border-brand-dark bg-brand-gray-50"
                    : isDark
                      ? "border-dark-border-light bg-dark-accent-light"
                      : "border-brand-gray-200 bg-brand-gray-50/50"
                } hover:${
                  isDark
                    ? "border-dark-border bg-dark-accent"
                    : "border-brand-gray-300 bg-brand-gray-100/50"
                }`}
              >
                <div className="text-center p-6">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto ${
                      isDark ? "bg-dark-border" : "bg-brand-gray-200"
                    }`}
                  >
                    <Plus
                      className={`w-6 h-6 ${
                        isDark
                          ? "text-dark-text-secondary"
                          : "text-brand-dark/40"
                      }`}
                    />
                  </div>
                  <p
                    className={`${
                      screenSize === "mobile" ? "text-sm" : "text-base"
                    } font-medium ${
                      isDark ? "text-dark-text-secondary" : "text-brand-dark/50"
                    } mb-2`}
                  >
                    {getEmptyStateMessage()}
                  </p>
                  {screenSize !== "mobile" && (
                    <p
                      className={`text-xs ${
                        isDark ? "text-dark-text-muted" : "text-brand-dark/30"
                      }`}
                    >
                      {status === "done"
                        ? "Tasks will appear here when completed"
                        : "Click the + button to add a task"}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
