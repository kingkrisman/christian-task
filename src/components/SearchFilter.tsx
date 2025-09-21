import React, { useState } from "react";
import {
  Search,
  X,
  Filter,
  ChevronDown,
  Check,
  Star,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilter: (filters: any) => void;
  totalTasks: number;
  screenSize: "mobile" | "tablet" | "desktop";
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  onSearch,
  onFilter,
  totalTasks,
  screenSize,
}) => {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    status: [] as string[],
    priority: [] as string[],
    assignee: [] as string[],
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  const toggleFilter = (
    category: keyof typeof activeFilters,
    value: string,
  ) => {
    const newFilters = { ...activeFilters };
    const index = newFilters[category].indexOf(value);

    if (index > -1) {
      newFilters[category].splice(index, 1);
    } else {
      newFilters[category].push(value);
    }

    setActiveFilters(newFilters);
    onFilter(newFilters);
  };

  const clearAllFilters = () => {
    const emptyFilters = {
      status: [],
      priority: [],
      assignee: [],
    };
    setActiveFilters(emptyFilters);
    onFilter(emptyFilters);
  };

  const getActiveFilterCount = () => {
    return (
      activeFilters.status.length +
      activeFilters.priority.length +
      activeFilters.assignee.length
    );
  };

  const statusOptions = [
    { value: "todo", label: "To Do", color: "bg-blue-100 text-blue-700" },
    {
      value: "inprogress",
      label: "In Progress",
      color: "bg-orange-100 text-orange-700",
    },
    { value: "done", label: "Done", color: "bg-green-100 text-green-700" },
  ];

  const priorityOptions = [
    {
      value: "high",
      label: "High",
      icon: AlertCircle,
      color: "text-red-500",
    },
    { value: "medium", label: "Medium", icon: Clock, color: "text-orange-500" },
    { value: "low", label: "Low", icon: Star, color: "text-blue-500" },
  ];

  const quickFilters = [
    { label: "My tasks", filter: { assignee: ["1"] } },
    { label: "High priority", filter: { priority: ["high"] } },
    { label: "Due today", filter: {} },
    { label: "Overdue", filter: {} },
  ];

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
            isDark ? "text-dark-text-muted" : "text-brand-dark/40"
          } ${screenSize === "mobile" ? "w-4 h-4" : "w-5 h-5"}`}
        />
        <input
          type="text"
          placeholder={
            screenSize === "mobile"
              ? "Search tasks..."
              : "Search tasks, projects, or team members..."
          }
          value={searchQuery}
          onChange={handleSearchChange}
          className={`w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-success/20 focus:border-brand-success/30 transition-colors ${
            isDark
              ? "bg-dark-accent border-dark-border text-dark-text placeholder-dark-text-muted"
              : "bg-white border-brand-gray-200 text-brand-dark placeholder-brand-dark/40"
          } ${
            screenSize === "mobile"
              ? "pl-10 pr-10 py-2.5 text-sm"
              : "pl-12 pr-12 py-3 text-base"
          }`}
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors ${
              isDark
                ? "text-dark-text-muted hover:text-dark-text-secondary"
                : "text-brand-dark/40 hover:text-brand-dark/60"
            } ${screenSize === "mobile" ? "w-4 h-4" : "w-5 h-5"}`}
          >
            <X className="w-full h-full" />
          </button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
              isDark
                ? `border-dark-border ${
                    showFilters
                      ? "bg-dark-accent"
                      : "bg-dark-card hover:bg-dark-accent"
                  }`
                : `border-brand-gray-200 hover:bg-brand-gray-50 ${
                    showFilters ? "bg-brand-gray-100" : "bg-white"
                  }`
            }`}
          >
            <Filter
              className={`${isDark ? "text-dark-text" : "text-brand-dark"} ${
                screenSize === "mobile" ? "w-3 h-3" : "w-4 h-4"
              }`}
            />
            <span
              className={`font-medium ${
                isDark ? "text-dark-text" : "text-brand-dark"
              } ${screenSize === "mobile" ? "text-xs" : "text-sm"}`}
            >
              Filters
            </span>
            {getActiveFilterCount() > 0 && (
              <span
                className={`bg-brand-success text-white rounded-full flex items-center justify-center font-bold ${
                  screenSize === "mobile"
                    ? "w-4 h-4 text-xs"
                    : "w-5 h-5 text-xs"
                }`}
              >
                {getActiveFilterCount()}
              </span>
            )}
            <ChevronDown
              className={`transition-transform ${
                isDark ? "text-dark-text-secondary" : "text-brand-dark/60"
              } ${
                showFilters ? "rotate-180" : ""
              } ${screenSize === "mobile" ? "w-3 h-3" : "w-4 h-4"}`}
            />
          </button>

          {getActiveFilterCount() > 0 && (
            <button
              onClick={clearAllFilters}
              className={`text-brand-red hover:text-brand-red/80 transition-colors font-medium ${
                screenSize === "mobile" ? "text-xs" : "text-sm"
              }`}
            >
              Clear all
            </button>
          )}
        </div>

        <div
          className={`${
            isDark ? "text-dark-text-secondary" : "text-brand-dark/60"
          } ${screenSize === "mobile" ? "text-xs" : "text-sm"}`}
        >
          {totalTasks} results
        </div>
      </div>

      {/* Quick Filters - Mobile optimized */}
      {screenSize === "mobile" && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {quickFilters.map((filter, index) => (
            <button
              key={index}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                isDark
                  ? "bg-dark-accent text-dark-text hover:bg-dark-border"
                  : "bg-brand-gray-100 text-brand-dark hover:bg-brand-gray-200"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      )}

      {/* Expanded Filters */}
      {showFilters && (
        <div
          className={`border rounded-lg p-4 space-y-6 ${
            isDark
              ? "bg-dark-card border-dark-border"
              : "bg-white border-brand-gray-200"
          } ${screenSize === "mobile" ? "p-3 space-y-4" : ""}`}
        >
          {/* Quick Filters - Desktop/Tablet */}
          {screenSize !== "mobile" && (
            <div>
              <h4
                className={`font-semibold mb-3 ${
                  isDark ? "text-dark-text" : "text-brand-dark"
                } ${screenSize === "tablet" ? "text-sm" : "text-base"}`}
              >
                Quick Filters
              </h4>
              <div
                className={`grid gap-2 ${
                  screenSize === "tablet"
                    ? "grid-cols-2"
                    : "grid-cols-2 lg:grid-cols-4"
                }`}
              >
                {quickFilters.map((filter, index) => (
                  <button
                    key={index}
                    className={`px-3 py-2 rounded-lg transition-colors text-left ${
                      isDark
                        ? "bg-dark-accent text-dark-text hover:bg-dark-border"
                        : "bg-brand-gray-100 text-brand-dark hover:bg-brand-gray-200"
                    } ${screenSize === "tablet" ? "text-sm" : "text-sm"}`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Status Filter */}
          <div>
            <h4
              className={`font-semibold mb-3 ${
                isDark ? "text-dark-text" : "text-brand-dark"
              } ${screenSize === "mobile" ? "text-sm" : "text-base"}`}
            >
              Status
            </h4>
            <div
              className={`grid gap-2 ${
                screenSize === "mobile"
                  ? "grid-cols-1"
                  : screenSize === "tablet"
                    ? "grid-cols-3"
                    : "grid-cols-3"
              }`}
            >
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleFilter("status", option.value)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg border transition-colors ${
                    activeFilters.status.includes(option.value)
                      ? "border-brand-success bg-brand-success/5"
                      : isDark
                        ? "border-dark-border hover:bg-dark-accent"
                        : "border-brand-gray-200 hover:bg-brand-gray-50"
                  }`}
                >
                  <span
                    className={`${option.color} font-medium ${
                      screenSize === "mobile" ? "text-sm" : "text-sm"
                    }`}
                  >
                    {option.label}
                  </span>
                  {activeFilters.status.includes(option.value) && (
                    <Check
                      className={`text-brand-success ${
                        screenSize === "mobile" ? "w-3 h-3" : "w-4 h-4"
                      }`}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Priority Filter */}
          <div>
            <h4
              className={`font-semibold mb-3 ${
                isDark ? "text-dark-text" : "text-brand-dark"
              } ${screenSize === "mobile" ? "text-sm" : "text-base"}`}
            >
              Priority
            </h4>
            <div
              className={`grid gap-2 ${
                screenSize === "mobile"
                  ? "grid-cols-1"
                  : screenSize === "tablet"
                    ? "grid-cols-3"
                    : "grid-cols-3"
              }`}
            >
              {priorityOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleFilter("priority", option.value)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg border transition-colors ${
                    activeFilters.priority.includes(option.value)
                      ? "border-brand-success bg-brand-success/5"
                      : isDark
                        ? "border-dark-border hover:bg-dark-accent"
                        : "border-brand-gray-200 hover:bg-brand-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <option.icon
                      className={`${option.color} ${
                        screenSize === "mobile" ? "w-3 h-3" : "w-4 h-4"
                      }`}
                    />
                    <span
                      className={`font-medium ${
                        isDark ? "text-dark-text" : "text-brand-dark"
                      } ${screenSize === "mobile" ? "text-sm" : "text-sm"}`}
                    >
                      {option.label}
                    </span>
                  </div>
                  {activeFilters.priority.includes(option.value) && (
                    <Check
                      className={`text-brand-success ${
                        screenSize === "mobile" ? "w-3 h-3" : "w-4 h-4"
                      }`}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Team Members - Simplified for mobile */}
          <div>
            <h4
              className={`font-semibold mb-3 ${
                isDark ? "text-dark-text" : "text-brand-dark"
              } ${screenSize === "mobile" ? "text-sm" : "text-base"}`}
            >
              Assigned to
            </h4>
            <div
              className={`grid gap-2 ${
                screenSize === "mobile"
                  ? "grid-cols-1"
                  : screenSize === "tablet"
                    ? "grid-cols-2"
                    : "grid-cols-2"
              }`}
            >
              {["Vincent", "Sarah", "John", "Emma"].map((name, index) => (
                <button
                  key={index}
                  onClick={() =>
                    toggleFilter("assignee", (index + 1).toString())
                  }
                  className={`flex items-center justify-between px-3 py-2 rounded-lg border transition-colors ${
                    activeFilters.assignee.includes((index + 1).toString())
                      ? "border-brand-success bg-brand-success/5"
                      : isDark
                        ? "border-dark-border hover:bg-dark-accent"
                        : "border-brand-gray-200 hover:bg-brand-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className={`rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold ${
                        screenSize === "mobile"
                          ? "w-6 h-6 text-xs"
                          : "w-7 h-7 text-sm"
                      }`}
                    >
                      {name.charAt(0)}
                    </div>
                    <span
                      className={`font-medium ${
                        isDark ? "text-dark-text" : "text-brand-dark"
                      } ${screenSize === "mobile" ? "text-sm" : "text-sm"}`}
                    >
                      {name}
                    </span>
                  </div>
                  {activeFilters.assignee.includes((index + 1).toString()) && (
                    <Check
                      className={`text-brand-success ${
                        screenSize === "mobile" ? "w-3 h-3" : "w-4 h-4"
                      }`}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
