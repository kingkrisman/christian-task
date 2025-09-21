import React, { useState } from "react";
import { LeftSidebar } from "../components/LeftSidebar";
import { useTheme } from "../contexts/ThemeContext";
import { useTaskManager } from "../hooks/useTaskManager";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  Calendar as CalendarIcon,
  Clock,
  User,
  Flag,
  Search,
} from "lucide-react";

export default function Calendar() {
  const { isDark } = useTheme();
  const { filteredTasks } = useTaskManager();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Generate calendar dates
  const generateCalendarDates = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    const dates = [];

    // Add previous month's trailing days
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(
        year,
        month - 1,
        new Date(year, month, 0).getDate() - i,
      );
      dates.push({ date, isCurrentMonth: false });
    }

    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      dates.push({ date, isCurrentMonth: true });
    }

    // Add next month's leading days
    const remainingCells = 42 - dates.length;
    for (let day = 1; day <= remainingCells; day++) {
      const date = new Date(year, month + 1, day);
      dates.push({ date, isCurrentMonth: false });
    }

    return dates;
  };

  const calendarDates = generateCalendarDates();
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + (direction === "next" ? 1 : -1),
        1,
      ),
    );
  };

  const getTasksForDate = (date: Date) => {
    return filteredTasks.filter((task) => {
      const taskDate = new Date(task.date);
      return taskDate.toDateString() === date.toDateString();
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div
      className={`flex w-full min-h-screen ${isDark ? "bg-dark-primary" : "bg-white"}`}
    >
      <LeftSidebar screenSize="desktop" />

      <div className="flex-1 ml-[90px] p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1
                className={`text-3xl font-bold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
              >
                Calendar
              </h1>
              <p
                className={`text-sm ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"} mt-1`}
              >
                View and manage your tasks by date
              </p>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 transition-colors">
              <Plus className="w-4 h-4" />
              <span>New Event</span>
            </button>
          </div>

          {/* Calendar Navigation */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigateMonth("prev")}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark ? "hover:bg-dark-accent" : "hover:bg-brand-gray-100"
                  }`}
                >
                  <ChevronLeft
                    className={`w-5 h-5 ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                  />
                </button>

                <h2
                  className={`text-xl font-semibold min-w-[200px] text-center ${
                    isDark ? "text-dark-text" : "text-brand-dark"
                  }`}
                >
                  {monthNames[currentDate.getMonth()]}{" "}
                  {currentDate.getFullYear()}
                </h2>

                <button
                  onClick={() => navigateMonth("next")}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark ? "hover:bg-dark-accent" : "hover:bg-brand-gray-100"
                  }`}
                >
                  <ChevronRight
                    className={`w-5 h-5 ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                  />
                </button>
              </div>

              <button
                onClick={() => setCurrentDate(new Date())}
                className={`px-3 py-1 text-sm rounded-lg border transition-colors ${
                  isDark
                    ? "border-dark-border text-dark-text hover:bg-dark-accent"
                    : "border-brand-gray-200 text-brand-dark hover:bg-brand-gray-50"
                }`}
              >
                Today
              </button>
            </div>

            {/* View Mode Toggle */}
            <div
              className={`flex rounded-lg border ${
                isDark ? "border-dark-border" : "border-brand-gray-200"
              }`}
            >
              {["month", "week", "day"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as any)}
                  className={`px-3 py-1 text-sm first:rounded-l-lg last:rounded-r-lg transition-colors ${
                    viewMode === mode
                      ? isDark
                        ? "bg-dark-accent text-dark-text"
                        : "bg-brand-gray-100 text-brand-dark"
                      : isDark
                        ? "text-dark-text-secondary hover:bg-dark-accent"
                        : "text-brand-dark/60 hover:bg-brand-gray-50"
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div
          className={`rounded-xl border ${
            isDark
              ? "bg-dark-card border-dark-border"
              : "bg-white border-brand-gray-200"
          }`}
        >
          {/* Week Headers */}
          <div
            className={`grid grid-cols-7 border-b ${
              isDark ? "border-dark-border" : "border-brand-gray-200"
            }`}
          >
            {weekDays.map((day) => (
              <div
                key={day}
                className={`p-4 text-center font-medium ${
                  isDark ? "text-dark-text-secondary" : "text-brand-dark/60"
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7">
            {calendarDates.map(({ date, isCurrentMonth }, index) => {
              const tasksForDate = getTasksForDate(date);
              const isSelectedDate =
                selectedDate?.toDateString() === date.toDateString();

              return (
                <div
                  key={index}
                  onClick={() => setSelectedDate(date)}
                  className={`min-h-[120px] p-2 border-r border-b cursor-pointer transition-colors ${
                    isDark ? "border-dark-border" : "border-brand-gray-100"
                  } ${
                    isSelectedDate
                      ? isDark
                        ? "bg-dark-accent"
                        : "bg-brand-blue/5"
                      : isDark
                        ? "hover:bg-dark-accent/50"
                        : "hover:bg-brand-gray-50"
                  } ${!isCurrentMonth ? "opacity-50" : ""}`}
                >
                  <div className="flex flex-col h-full">
                    {/* Date Number */}
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-sm font-medium ${
                          isToday(date)
                            ? "bg-brand-blue text-white w-6 h-6 rounded-full flex items-center justify-center"
                            : isCurrentMonth
                              ? isDark
                                ? "text-dark-text"
                                : "text-brand-dark"
                              : isDark
                                ? "text-dark-text-secondary"
                                : "text-brand-dark/40"
                        }`}
                      >
                        {date.getDate()}
                      </span>

                      {tasksForDate.length > 0 && (
                        <span
                          className={`text-xs px-1 py-0.5 rounded-full ${
                            isDark
                              ? "bg-dark-border text-dark-text-secondary"
                              : "bg-brand-gray-200 text-brand-dark/60"
                          }`}
                        >
                          {tasksForDate.length}
                        </span>
                      )}
                    </div>

                    {/* Tasks for this date */}
                    <div className="flex-1 space-y-1">
                      {tasksForDate.slice(0, 3).map((task) => (
                        <div
                          key={task.id}
                          className={`text-xs p-1 rounded truncate ${
                            isDark ? "bg-dark-border" : "bg-brand-gray-100"
                          }`}
                          title={task.title}
                        >
                          <div className="flex items-center space-x-1">
                            <div
                              className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}
                            ></div>
                            <span
                              className={`truncate ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                            >
                              {task.title}
                            </span>
                          </div>
                        </div>
                      ))}

                      {tasksForDate.length > 3 && (
                        <div
                          className={`text-xs ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                        >
                          +{tasksForDate.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Date Details */}
        {selectedDate && (
          <div
            className={`mt-8 rounded-xl border p-6 ${
              isDark
                ? "bg-dark-card border-dark-border"
                : "bg-white border-brand-gray-200"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                className={`text-lg font-semibold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
              >
                {formatDate(selectedDate)}
              </h3>
              <button className="flex items-center space-x-2 px-3 py-1 text-sm bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 transition-colors">
                <Plus className="w-3 h-3" />
                <span>Add Task</span>
              </button>
            </div>

            <div className="space-y-3">
              {getTasksForDate(selectedDate).map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-lg border ${
                    isDark
                      ? "bg-dark-accent border-dark-border"
                      : "bg-brand-gray-50 border-brand-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div
                          className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`}
                        ></div>
                        <h4
                          className={`font-medium ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                        >
                          {task.title}
                        </h4>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            task.priority === "high"
                              ? "bg-red-100 text-red-800"
                              : task.priority === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {task.priority} priority
                        </span>
                      </div>

                      <p
                        className={`text-sm mb-2 ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                      >
                        {task.category}
                      </p>

                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Clock
                            className={`w-4 h-4 ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                          />
                          <span
                            className={`${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                          >
                            Progress: {task.progress}%
                          </span>
                        </div>

                        <div className="flex items-center space-x-1">
                          <User
                            className={`w-4 h-4 ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                          />
                          <span
                            className={`${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                          >
                            {task.assignees.length} assignee
                            {task.assignees.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex -space-x-2">
                      {task.assignees.slice(0, 3).map((assignee) => (
                        <img
                          key={assignee.id}
                          src={assignee.avatar}
                          alt={assignee.name}
                          className="w-8 h-8 rounded-full border-2 border-white"
                          title={assignee.name}
                        />
                      ))}
                      {task.assignees.length > 3 && (
                        <div
                          className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium ${
                            isDark
                              ? "bg-dark-border text-dark-text"
                              : "bg-brand-gray-200 text-brand-dark"
                          }`}
                        >
                          +{task.assignees.length - 3}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div
                      className={`w-full bg-gray-200 rounded-full h-2 ${
                        isDark ? "bg-dark-border" : "bg-brand-gray-200"
                      }`}
                    >
                      <div
                        className="bg-brand-blue h-2 rounded-full transition-all"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}

              {getTasksForDate(selectedDate).length === 0 && (
                <div className="text-center py-8">
                  <CalendarIcon
                    className={`w-12 h-12 mx-auto mb-3 ${
                      isDark ? "text-dark-text-secondary" : "text-brand-dark/40"
                    }`}
                  />
                  <p
                    className={`${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                  >
                    No tasks scheduled for this date
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
