import React, { useState, useRef } from "react";
import {
  MoreHorizontal,
  MessageCircle,
  Paperclip,
  Edit2,
  Trash2,
  ArrowRight,
  Clock,
  Star,
  AlertCircle,
} from "lucide-react";
import { Task } from "../lib/data";
import { useTheme } from "../contexts/ThemeContext";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onMove: (taskId: string, newStatus: Task["status"]) => void;
  screenSize: "mobile" | "tablet" | "desktop";
}

const ProgressIcon = ({
  className,
  screenSize,
}: {
  className?: string;
  screenSize: "mobile" | "tablet" | "desktop";
}) => (
  <svg
    className={`${className} ${
      screenSize === "mobile" ? "w-3 h-3" : "w-4 h-4"
    }`}
    viewBox="0 0 12 8"
    fill="none"
  >
    <path
      d="M0.664062 0.666667C0.664062 0.298477 0.962539 0 1.33073 0L1.9974 0C2.36559 0 2.66406 0.298477 2.66406 0.666667C2.66406 1.03486 2.36559 1.33333 1.9974 1.33333H1.33073C0.962539 1.33333 0.664062 1.03486 0.664062 0.666667ZM3.9974 0.666667C3.9974 0.298477 4.29587 0 4.66406 0H10.6641C11.0323 0 11.3307 0.298477 11.3307 0.666667C11.3307 1.03486 11.0323 1.33333 10.6641 1.33333H4.66406C4.29587 1.33333 3.9974 1.03486 3.9974 0.666667ZM0.664062 4C0.664062 3.63181 0.962539 3.33333 1.33073 3.33333H1.9974C2.36559 3.33333 2.66406 3.63181 2.66406 4C2.66406 4.36819 2.36559 4.66667 1.9974 4.66667H1.33073C0.962539 4.66667 0.664062 4.36819 0.664062 4ZM3.9974 4C3.9974 3.63181 4.29587 3.33333 4.66406 3.33333H10.6641C11.0323 3.33333 11.3307 3.63181 11.3307 4C11.3307 4.36819 11.0323 4.66667 10.6641 4.66667H4.66406C4.29587 4.66667 3.9974 4.36819 3.9974 4ZM0.664062 7.33333C0.664062 6.96514 0.962539 6.66667 1.33073 6.66667H1.9974C2.36559 6.66667 2.66406 6.96514 2.66406 7.33333C2.66406 7.70152 2.36559 8 1.9974 8H1.33073C0.962539 8 0.664062 7.70152 0.664062 7.33333ZM3.9974 7.33333C3.9974 6.96514 4.29587 6.66667 4.66406 6.66667H10.6641C11.0323 6.66667 11.3307 6.96514 11.3307 7.33333C11.3307 7.70152 11.0323 8 10.6641 8H4.66406C4.29587 8 3.9974 7.70152 3.9974 7.33333Z"
      fill="currentColor"
    />
  </svg>
);

const getProgressColor = (progress: number, status: string) => {
  if (status === "done") return "#78D700";
  if (status === "inprogress") {
    if (progress <= 40) return "#FF7979";
    if (progress <= 70) return "#FFA048";
    return "#78D700";
  }
  if (progress <= 40) return "#FF7979";
  if (progress <= 70) return "#FFA048";
  return "#78D700";
};

const getDateBadgeColor = (status: string, priority: string) => {
  if (status === "done") return "bg-brand-blue/10 text-brand-blue";
  if (status === "inprogress") {
    if (priority === "high") return "bg-brand-orange/10 text-brand-orange";
    return "bg-brand-red/10 text-brand-red";
  }
  if (priority === "high") return "bg-brand-red/10 text-brand-red";
  if (priority === "medium") return "bg-brand-orange/10 text-brand-orange";
  return "bg-brand-blue/10 text-brand-blue";
};

const getPriorityIcon = (
  priority: string,
  screenSize: "mobile" | "tablet" | "desktop",
) => {
  const iconSize = screenSize === "mobile" ? "w-2.5 h-2.5" : "w-3 h-3";

  switch (priority) {
    case "high":
      return <AlertCircle className={`${iconSize} text-red-500`} />;
    case "medium":
      return <Clock className={`${iconSize} text-orange-500`} />;
    case "low":
      return <Star className={`${iconSize} text-blue-500`} />;
    default:
      return null;
  }
};

const isOverdue = (dateString: string) => {
  const taskDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return taskDate < today;
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onMove,
  screenSize,
}) => {
  const { isDark } = useTheme();
  const [showMenu, setShowMenu] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const progressColor = getProgressColor(task.progress, task.status);
  const progressWidth = `${task.progress}%`;
  const dateBadgeColor = getDateBadgeColor(task.status, task.priority);
  const taskIsOverdue = isOverdue(task.date) && task.status !== "done";

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", task.id);
    e.dataTransfer.setData("taskId", task.id);
    e.dataTransfer.effectAllowed = "move";
    setIsDragging(true);

    // Add drag image
    if (cardRef.current) {
      const dragImage = cardRef.current.cloneNode(true) as HTMLElement;
      dragImage.style.transform = "rotate(5deg)";
      dragImage.style.opacity = "0.8";
      document.body.appendChild(dragImage);
      e.dataTransfer.setDragImage(dragImage, 160, 89);
      setTimeout(() => document.body.removeChild(dragImage), 0);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const getNextStatus = (): Task["status"] | null => {
    switch (task.status) {
      case "todo":
        return "inprogress";
      case "inprogress":
        return "done";
      default:
        return null;
    }
  };

  const nextStatus = getNextStatus();

  const handleDoubleClick = () => {
    onEdit(task);
  };

  // Mobile-specific tap handling
  const handleTap = () => {
    if (screenSize === "mobile") {
      onEdit(task);
    }
  };

  const getCardPadding = () => {
    switch (screenSize) {
      case "mobile":
        return "p-3";
      case "tablet":
        return "p-4";
      case "desktop":
        return "p-5";
      default:
        return "p-5";
    }
  };

  const getCardSpacing = () => {
    switch (screenSize) {
      case "mobile":
        return "mb-3";
      case "tablet":
        return "mb-4";
      case "desktop":
        return "mb-4";
      default:
        return "mb-4";
    }
  };

  const getTextSizes = () => {
    switch (screenSize) {
      case "mobile":
        return {
          title: "text-sm",
          category: "text-xs",
          progress: "text-xs",
          date: "text-xs",
          stats: "text-xs",
        };
      case "tablet":
        return {
          title: "text-sm",
          category: "text-xs",
          progress: "text-xs",
          date: "text-xs",
          stats: "text-xs",
        };
      case "desktop":
        return {
          title: "text-base",
          category: "text-sm",
          progress: "text-sm",
          date: "text-sm",
          stats: "text-sm",
        };
      default:
        return {
          title: "text-base",
          category: "text-sm",
          progress: "text-sm",
          date: "text-sm",
          stats: "text-sm",
        };
    }
  };

  const textSizes = getTextSizes();

  return (
    <div
      ref={cardRef}
      className={`relative w-full rounded-xl border-2 cursor-move group transition-all duration-200 ${getCardPadding()} ${
        isDark ? "bg-dark-card" : "bg-white"
      } ${
        isDragging
          ? isDark
            ? "border-dark-text shadow-2xl scale-105 rotate-2 opacity-80"
            : "border-brand-dark shadow-2xl scale-105 rotate-2 opacity-80"
          : isHovered
            ? isDark
              ? "border-dark-border shadow-lg transform scale-[1.02]"
              : "border-brand-gray-300 shadow-lg transform scale-[1.02]"
            : task.status === "done"
              ? "border-green-200 shadow-soft"
              : isDark
                ? "border-dark-border hover:border-dark-accent shadow-soft hover:shadow-card"
                : "border-brand-gray-100 hover:border-brand-gray-200 shadow-soft hover:shadow-card"
      } ${
        taskIsOverdue
          ? "ring-2 ring-red-200 border-red-300"
          : task.priority === "high"
            ? "ring-1 ring-orange-200"
            : ""
      }`}
      draggable={screenSize !== "mobile"}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDoubleClick={screenSize !== "mobile" ? handleDoubleClick : undefined}
      onClick={screenSize === "mobile" ? handleTap : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Priority & Status Indicators */}
      <div className="absolute top-2 left-2 flex items-center space-x-1">
        {getPriorityIcon(task.priority, screenSize)}
        {taskIsOverdue && (
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
        )}
        {task.status === "done" && (
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
        )}
      </div>

      {/* Header */}
      <div className={`flex items-start justify-between ${getCardSpacing()}`}>
        <div className="flex-1 min-w-0 pt-2">
          <h3
            className={`${textSizes.title} font-bold leading-none mb-1 truncate ${
              task.status === "done"
                ? isDark
                  ? "text-dark-text-secondary line-through"
                  : "text-brand-dark/70 line-through"
                : isDark
                  ? "text-dark-text"
                  : "text-brand-dark"
            }`}
          >
            {task.title}
          </h3>
          <p
            className={`${textSizes.category} font-medium truncate ${
              isDark ? "text-dark-text-muted" : "text-brand-dark/50"
            }`}
          >
            {task.category}
          </p>
        </div>

        <div className="relative ml-3 flex-shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className={`rounded-full border flex items-center justify-center transition-all duration-200 ${
              isDark
                ? `bg-dark-accent border-dark-border ${
                    showMenu || isHovered
                      ? "bg-dark-border border-dark-text scale-110"
                      : "hover:bg-dark-border"
                  }`
                : `bg-white border-brand-gray-300 ${
                    showMenu || isHovered
                      ? "bg-brand-gray-50 border-brand-gray-400 scale-110"
                      : "hover:bg-brand-gray-50"
                  }`
            } ${
              screenSize === "mobile"
                ? "w-6 h-6"
                : screenSize === "tablet"
                  ? "w-7 h-7"
                  : "w-[26px] h-[26px]"
            }`}
          >
            <MoreHorizontal
              className={`${isDark ? "text-dark-text" : "text-brand-dark"} ${
                screenSize === "mobile" ? "w-2.5 h-2.5" : "w-3 h-3"
              }`}
            />
          </button>

          {/* Enhanced Context Menu */}
          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(false);
                }}
              />
              <div
                className={`absolute right-0 top-8 border rounded-lg shadow-card z-30 py-1 animate-in slide-in-from-top-2 duration-200 ${
                  isDark
                    ? "bg-dark-card border-dark-border"
                    : "bg-white border-brand-gray-200"
                } ${
                  screenSize === "mobile" ? "min-w-[140px]" : "min-w-[160px]"
                }`}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(task);
                    setShowMenu(false);
                  }}
                  className={`flex items-center space-x-3 w-full px-3 py-2 transition-colors ${
                    isDark
                      ? "text-dark-text hover:bg-dark-accent"
                      : "text-brand-dark hover:bg-brand-gray-50"
                  } ${screenSize === "mobile" ? "text-xs" : "text-sm"}`}
                >
                  <Edit2
                    className={`${
                      screenSize === "mobile" ? "w-3 h-3" : "w-4 h-4"
                    }`}
                  />
                  <span>Edit task</span>
                </button>

                {nextStatus && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onMove(task.id, nextStatus);
                      setShowMenu(false);
                    }}
                    className={`flex items-center space-x-3 w-full px-3 py-2 transition-colors ${
                      isDark
                        ? "text-dark-text hover:bg-dark-accent"
                        : "text-brand-dark hover:bg-brand-gray-50"
                    } ${screenSize === "mobile" ? "text-xs" : "text-sm"}`}
                  >
                    <ArrowRight
                      className={`${
                        screenSize === "mobile" ? "w-3 h-3" : "w-4 h-4"
                      }`}
                    />
                    <span>
                      Move to{" "}
                      {nextStatus === "inprogress" ? "In Progress" : "Done"}
                    </span>
                  </button>
                )}

                <div
                  className={`border-t my-1 ${
                    isDark ? "border-dark-border" : "border-brand-gray-100"
                  }`}
                />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(task.id);
                    setShowMenu(false);
                  }}
                  className={`flex items-center space-x-3 w-full px-3 py-2 text-red-600 hover:bg-red-50 transition-colors ${
                    screenSize === "mobile" ? "text-xs" : "text-sm"
                  }`}
                >
                  <Trash2
                    className={`${
                      screenSize === "mobile" ? "w-3 h-3" : "w-4 h-4"
                    }`}
                  />
                  <span>Delete task</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Enhanced Progress Section */}
      <div className={`${screenSize === "mobile" ? "mb-4" : "mb-6"}`}>
        <div
          className={`flex items-center justify-between ${
            screenSize === "mobile" ? "mb-1" : "mb-2"
          }`}
        >
          <div className="flex items-center space-x-2">
            <ProgressIcon
              className={isDark ? "text-dark-text-muted" : "text-brand-dark/50"}
              screenSize={screenSize}
            />
            <span
              className={`${textSizes.progress} font-semibold ${
                isDark ? "text-dark-text-muted" : "text-brand-dark/50"
              }`}
            >
              Progress
            </span>
          </div>
          <span
            className={`${textSizes.progress} font-semibold text-right ${
              isDark ? "text-dark-text" : "text-brand-dark"
            }`}
          >
            {task.completedTasks}/{task.totalTasks}
          </span>
        </div>

        {/* Animated Progress Bar */}
        <div
          className={`w-full h-1 rounded-sm relative overflow-hidden ${
            isDark ? "bg-dark-border" : "bg-brand-gray-200"
          }`}
        >
          <div
            className="h-full rounded-sm transition-all duration-700 ease-out relative"
            style={{
              width: progressWidth,
              backgroundColor: progressColor,
            }}
          >
            {/* Progress Animation */}
            <div
              className="absolute inset-0 bg-white/30 animate-pulse"
              style={{
                animation:
                  task.status === "inprogress" ? "pulse 2s infinite" : "none",
              }}
            />
          </div>

          {/* Progress Shine Effect */}
          {task.progress > 0 && (
            <div
              className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 animate-slide-progress"
              style={{
                left: `${task.progress - 30}%`,
                animationDuration: "3s",
                animationDelay: "1s",
              }}
            />
          )}
        </div>

        {/* Progress Percentage */}
        <div className="flex items-center justify-between mt-1">
          <span
            className={`${screenSize === "mobile" ? "text-xs" : "text-xs"} ${
              isDark ? "text-dark-text-muted" : "text-brand-dark/40"
            }`}
          >
            {Math.round(task.progress)}% complete
          </span>
          {task.status === "done" && (
            <span
              className={`${
                screenSize === "mobile" ? "text-xs" : "text-xs"
              } text-green-600 font-medium`}
            >
              ✓ Done
            </span>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-between">
        {/* Enhanced Date Badge */}
        <div
          className={`px-3 py-1.5 rounded-[17px] ${dateBadgeColor} font-semibold relative ${
            taskIsOverdue ? "ring-2 ring-red-300 ring-opacity-50" : ""
          } ${textSizes.date}`}
        >
          {task.date}
          {taskIsOverdue && (
            <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" />
          )}
        </div>

        {/* Right Side - Enhanced Interactions */}
        <div
          className={`flex items-center ${
            screenSize === "mobile" ? "space-x-2" : "space-x-3"
          }`}
        >
          {/* Comments */}
          {task.comments > 0 && (
            <div className="flex items-center space-x-1 group/comment">
              <MessageCircle
                className={`group-hover/comment:text-blue-500 transition-colors ${
                  isDark ? "text-dark-text-muted" : "text-brand-dark/50"
                } ${screenSize === "mobile" ? "w-4 h-4" : "w-[18px] h-[18px]"}`}
              />
              <span
                className={`${textSizes.stats} font-semibold group-hover/comment:text-blue-500 transition-colors ${
                  isDark ? "text-dark-text-muted" : "text-brand-dark/50"
                }`}
              >
                {task.comments}
              </span>
            </div>
          )}

          {/* Attachments */}
          {task.attachments > 0 && (
            <div className="flex items-center space-x-1 group/attachment">
              <Paperclip
                className={`group-hover/attachment:text-green-500 transition-colors ${
                  isDark ? "text-dark-text-muted" : "text-brand-dark/50"
                } ${screenSize === "mobile" ? "w-4 h-4" : "w-[18px] h-[18px]"}`}
              />
              <span
                className={`${textSizes.stats} font-semibold group-hover/attachment:text-green-500 transition-colors ${
                  isDark ? "text-dark-text-muted" : "text-brand-dark/50"
                }`}
              >
                {task.attachments}
              </span>
            </div>
          )}

          {/* Enhanced User Avatars */}
          {task.assignees.length > 0 && (
            <div className="flex items-center -space-x-1.5">
              {task.assignees
                .slice(0, screenSize === "mobile" ? 2 : 3)
                .map((user, index) => (
                  <div
                    key={user.id}
                    className={`relative rounded-full border-2 border-white overflow-hidden transform transition-transform hover:scale-110 hover:z-10 ${
                      screenSize === "mobile" ? "w-6 h-6" : "w-[30px] h-[30px]"
                    }`}
                    style={{ zIndex: task.assignees.length - index }}
                    title={user.name}
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent) {
                          parent.className +=
                            " bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center";
                          parent.innerHTML = `<span class="text-white text-xs font-bold">${user.name.charAt(0)}</span>`;
                        }
                      }}
                    />

                    {/* Online Indicator for First User */}
                    {index === 0 && (
                      <div
                        className={`absolute -bottom-0.5 -right-0.5 bg-green-400 rounded-full border-2 border-white ${
                          screenSize === "mobile" ? "w-2 h-2" : "w-3 h-3"
                        }`}
                      />
                    )}
                  </div>
                ))}
              {task.assignees.length > (screenSize === "mobile" ? 2 : 3) && (
                <div
                  className={`rounded-full border-2 flex items-center justify-center transition-colors ${
                    isDark
                      ? "bg-dark-accent border-dark-card hover:bg-dark-border"
                      : "bg-brand-gray-100 border-white hover:bg-brand-gray-200"
                  } ${
                    screenSize === "mobile" ? "w-6 h-6" : "w-[30px] h-[30px]"
                  }`}
                >
                  <span
                    className={`font-bold ${
                      isDark ? "text-dark-text" : "text-brand-dark"
                    } ${screenSize === "mobile" ? "text-xs" : "text-xs"}`}
                  >
                    +{task.assignees.length - (screenSize === "mobile" ? 2 : 3)}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Hover Actions - Desktop only */}
      {isHovered && !showMenu && screenSize === "desktop" && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/10 to-transparent h-16 rounded-b-xl flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-brand-dark hover:bg-white transition-colors"
          >
            Quick Edit
          </button>
        </div>
      )}
    </div>
  );
};
