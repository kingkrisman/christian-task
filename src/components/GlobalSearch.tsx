import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  X,
  Clock,
  User,
  Folder,
  CheckSquare,
  ArrowUpRight,
  Command,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { mockTasks, mockProjects, mockUsers } from "../lib/data";

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: string;
  type: "task" | "project" | "user" | "action";
  title: string;
  description?: string;
  avatar?: string;
  status?: string;
  category?: string;
  action?: () => void;
}

const getSearchResults = (query: string): SearchResult[] => {
  if (!query.trim()) {
    return [
      {
        id: "new-task",
        type: "action",
        title: "Create new task",
        description: "Add a new task to your board",
        action: () => console.log("Create new task"),
      },
      {
        id: "new-project",
        type: "action",
        title: "Create new project",
        description: "Start a new project",
        action: () => console.log("Create new project"),
      },
      {
        id: "settings",
        type: "action",
        title: "Open settings",
        description: "Manage your preferences",
        action: () => console.log("Open settings"),
      },
    ];
  }

  const results: SearchResult[] = [];
  const lowerQuery = query.toLowerCase();

  // Search tasks
  mockTasks
    .filter(
      (task) =>
        task.title.toLowerCase().includes(lowerQuery) ||
        task.category.toLowerCase().includes(lowerQuery),
    )
    .slice(0, 5)
    .forEach((task) => {
      results.push({
        id: task.id,
        type: "task",
        title: task.title,
        description: task.category,
        status: task.status,
      });
    });

  // Search projects
  mockProjects
    .filter((project) => project.name.toLowerCase().includes(lowerQuery))
    .slice(0, 3)
    .forEach((project) => {
      results.push({
        id: project.id,
        type: "project",
        title: project.name,
        description: `${project.count} tasks`,
      });
    });

  // Search users
  mockUsers
    .filter((user) => user.name.toLowerCase().includes(lowerQuery))
    .slice(0, 3)
    .forEach((user) => {
      results.push({
        id: user.id,
        type: "user",
        title: user.name,
        description: "Team member",
        avatar: user.avatar,
      });
    });

  return results;
};

const getResultIcon = (type: string, status?: string) => {
  switch (type) {
    case "task":
      return (
        <CheckSquare
          className={`w-4 h-4 ${
            status === "done"
              ? "text-green-500"
              : status === "inprogress"
                ? "text-orange-500"
                : "text-blue-500"
          }`}
        />
      );
    case "project":
      return <Folder className="w-4 h-4 text-purple-500" />;
    case "user":
      return <User className="w-4 h-4 text-indigo-500" />;
    case "action":
      return <ArrowUpRight className="w-4 h-4 text-gray-500" />;
    default:
      return <Search className="w-4 h-4 text-gray-500" />;
  }
};

export const GlobalSearch: React.FC<GlobalSearchProps> = ({
  isOpen,
  onClose,
}) => {
  const { isDark } = useTheme();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = getSearchResults(query);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < results.length - 1 ? prev + 1 : prev,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
          e.preventDefault();
          if (results[selectedIndex]) {
            handleResultClick(results[selectedIndex]);
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, results, onClose]);

  const handleResultClick = (result: SearchResult) => {
    if (result.action) {
      result.action();
    } else {
      // Handle navigation to result
      console.log("Navigate to:", result);
    }
    onClose();
    setQuery("");
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Search Dialog */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
        <div
          className={`w-full max-w-2xl mx-4 rounded-xl border shadow-2xl ${
            isDark
              ? "bg-dark-card border-dark-border"
              : "bg-white border-brand-gray-200"
          }`}
        >
          {/* Search Input */}
          <div
            className={`flex items-center px-4 py-3 border-b ${
              isDark ? "border-dark-border" : "border-brand-gray-100"
            }`}
          >
            <Search
              className={`w-5 h-5 mr-3 ${
                isDark ? "text-dark-text-muted" : "text-brand-dark/40"
              }`}
            />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search tasks, projects, people..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={`flex-1 bg-transparent outline-none text-base ${
                isDark
                  ? "text-dark-text placeholder-dark-text-muted"
                  : "text-brand-dark placeholder-brand-dark/40"
              }`}
            />
            <button
              onClick={onClose}
              className={`p-1 rounded-md transition-colors ${
                isDark
                  ? "hover:bg-dark-accent text-dark-text-muted"
                  : "hover:bg-brand-gray-100 text-brand-dark/40"
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {results.length === 0 ? (
              <div className="p-8 text-center">
                <Search
                  className={`w-12 h-12 mx-auto mb-3 ${
                    isDark ? "text-dark-text-muted" : "text-brand-dark/30"
                  }`}
                />
                <p
                  className={`text-sm ${
                    isDark ? "text-dark-text-secondary" : "text-brand-dark/60"
                  }`}
                >
                  {query
                    ? "No results found"
                    : "Type to search or use commands below"}
                </p>
              </div>
            ) : (
              <div className="py-2">
                {query === "" && (
                  <div
                    className={`px-4 py-2 text-xs font-medium uppercase tracking-wide ${
                      isDark ? "text-dark-text-muted" : "text-brand-dark/50"
                    }`}
                  >
                    Quick Actions
                  </div>
                )}
                {query !== "" && (
                  <div
                    className={`px-4 py-2 text-xs font-medium uppercase tracking-wide ${
                      isDark ? "text-dark-text-muted" : "text-brand-dark/50"
                    }`}
                  >
                    Search Results
                  </div>
                )}

                {results.map((result, index) => (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                      index === selectedIndex
                        ? isDark
                          ? "bg-dark-accent"
                          : "bg-brand-gray-100"
                        : isDark
                          ? "hover:bg-dark-accent/50"
                          : "hover:bg-brand-gray-50"
                    }`}
                  >
                    {/* Icon or Avatar */}
                    <div className="flex-shrink-0">
                      {result.avatar ? (
                        <img
                          src={result.avatar}
                          alt={result.title}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isDark ? "bg-dark-border" : "bg-brand-gray-200"
                          }`}
                        >
                          {getResultIcon(result.type, result.status)}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm font-medium truncate ${
                          isDark ? "text-dark-text" : "text-brand-dark"
                        }`}
                      >
                        {result.title}
                      </p>
                      {result.description && (
                        <p
                          className={`text-xs truncate ${
                            isDark
                              ? "text-dark-text-secondary"
                              : "text-brand-dark/60"
                          }`}
                        >
                          {result.description}
                        </p>
                      )}
                    </div>

                    {/* Type Badge */}
                    <div className="flex-shrink-0">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          result.type === "task"
                            ? "bg-blue-100 text-blue-700"
                            : result.type === "project"
                              ? "bg-purple-100 text-purple-700"
                              : result.type === "user"
                                ? "bg-indigo-100 text-indigo-700"
                                : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {result.type.charAt(0).toUpperCase() +
                          result.type.slice(1)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            className={`px-4 py-3 border-t ${
              isDark ? "border-dark-border" : "border-brand-gray-100"
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <kbd
                    className={`px-1.5 py-0.5 rounded border ${
                      isDark
                        ? "bg-dark-border border-dark-accent text-dark-text-muted"
                        : "bg-brand-gray-100 border-brand-gray-200 text-brand-dark/60"
                    }`}
                  >
                    ↑↓
                  </kbd>
                  <span
                    className={
                      isDark ? "text-dark-text-muted" : "text-brand-dark/50"
                    }
                  >
                    navigate
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <kbd
                    className={`px-1.5 py-0.5 rounded border ${
                      isDark
                        ? "bg-dark-border border-dark-accent text-dark-text-muted"
                        : "bg-brand-gray-100 border-brand-gray-200 text-brand-dark/60"
                    }`}
                  >
                    ⏎
                  </kbd>
                  <span
                    className={
                      isDark ? "text-dark-text-muted" : "text-brand-dark/50"
                    }
                  >
                    select
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Command className="w-3 h-3" />
                <span
                  className={
                    isDark ? "text-dark-text-muted" : "text-brand-dark/50"
                  }
                >
                  Powered by TaskFlow
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
