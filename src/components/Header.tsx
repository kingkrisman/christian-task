import React from "react";
import { Search, Calendar } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigation } from "../hooks/useNavigation";
import { NotificationDropdown } from "./NotificationDropdown";
import { UserProfileDropdown } from "./UserProfileDropdown";

interface HeaderProps {
  screenSize: "mobile" | "tablet" | "desktop";
}

interface SubHeaderProps {
  onCreateTask: () => void;
  screenSize: "mobile" | "tablet" | "desktop";
}

export const Header: React.FC<HeaderProps> = ({ screenSize }) => {
  const { isDark } = useTheme();
  const { openGlobalSearch } = useNavigation();

  return (
    <div
      className={`border-b ${
        isDark
          ? "bg-dark-primary border-dark-border"
          : "bg-white border-brand-gray-200"
      }`}
    >
      <div
        className={`flex items-center justify-between ${
          screenSize === "mobile"
            ? "px-4 py-3"
            : screenSize === "tablet"
              ? "px-6 py-4"
              : "px-8 py-6"
        }`}
      >
        {/* Welcome Message */}
        <div className="flex-1 min-w-0">
          <h1
            className={`font-bold truncate ${
              isDark ? "text-dark-text" : "text-brand-dark"
            } ${
              screenSize === "mobile"
                ? "text-lg"
                : screenSize === "tablet"
                  ? "text-xl"
                  : "text-xl"
            }`}
          >
            Welcome back, Vincent 👋
          </h1>
        </div>

        {/* Right Side Actions */}
        <div
          className={`flex items-center ${
            screenSize === "mobile" ? "space-x-2" : "space-x-4"
          }`}
        >
          {/* Search */}
          <button
            onClick={openGlobalSearch}
            className={`flex items-center justify-center rounded-lg transition-colors ${
              isDark ? "hover:bg-dark-accent" : "hover:bg-brand-gray-100"
            } ${
              screenSize === "mobile"
                ? "w-8 h-8"
                : screenSize === "tablet"
                  ? "w-9 h-9"
                  : "w-10 h-10"
            }`}
            title="Search (Cmd+K)"
          >
            <Search
              className={`${
                isDark ? "text-dark-text-secondary" : "text-brand-dark/60"
              } ${screenSize === "mobile" ? "w-4 h-4" : "w-5 h-5"}`}
            />
          </button>

          {/* Notifications */}
          <NotificationDropdown screenSize={screenSize} />

          {/* Calendar - Tablet/Desktop only */}
          {screenSize !== "mobile" && (
            <div className="flex items-center space-x-3">
              <Calendar
                className={`${
                  isDark ? "text-dark-text-secondary" : "text-brand-dark/60"
                } ${screenSize === "tablet" ? "w-4 h-4" : "w-5 h-5"}`}
              />
              <span
                className={`${
                  isDark ? "text-dark-text-secondary" : "text-brand-dark/60"
                } font-semibold ${
                  screenSize === "tablet" ? "text-sm" : "text-base"
                }`}
              >
                19 May 2022
              </span>
            </div>
          )}

          {/* User Avatar */}
          <UserProfileDropdown screenSize={screenSize} />
        </div>
      </div>
    </div>
  );
};

export const SubHeader: React.FC<SubHeaderProps> = ({
  onCreateTask,
  screenSize,
}) => {
  const { isDark } = useTheme();

  return (
    <div
      className={`border-b ${
        isDark
          ? "bg-dark-primary border-dark-border"
          : "bg-white border-brand-gray-100"
      }`}
    >
      <div
        className={`flex items-center justify-between ${
          screenSize === "mobile"
            ? "px-4 py-3"
            : screenSize === "tablet"
              ? "px-6 py-4"
              : "px-8 py-4"
        }`}
      >
        {/* Left Side - Board View */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            {/* Board View Icon */}
            <svg
              className={`${
                isDark ? "text-dark-text" : "text-brand-dark"
              } ${screenSize === "mobile" ? "w-5 h-5" : "w-6 h-6"}`}
              viewBox="0 0 29 18"
              fill="none"
            >
              <path
                d="M28.25 2.25C29.0784 2.25 29.75 2.92157 29.75 3.75V6.75C29.75 7.57843 29.0784 8.25 28.25 8.25L17.75 8.25C16.9216 8.25 16.25 7.57843 16.25 6.75L16.25 3.75C16.25 2.92157 16.9216 2.25 17.75 2.25L28.25 2.25ZM28.25 6.75V3.75L17.75 3.75L17.75 6.75L28.25 6.75Z"
                fill="currentColor"
              />
              <path
                d="M28.25 9.75C29.0784 9.75 29.75 10.4216 29.75 11.25V14.25C29.75 15.0784 29.0784 15.75 28.25 15.75H17.75C16.9216 15.75 16.25 15.0784 16.25 14.25L16.25 11.25C16.25 10.4216 16.9216 9.75 17.75 9.75L28.25 9.75ZM28.25 14.25V11.25L17.75 11.25L17.75 14.25H28.25Z"
                fill="currentColor"
              />
            </svg>

            <div>
              <span
                className={`font-semibold ${
                  isDark ? "text-dark-text" : "text-brand-dark"
                } ${screenSize === "mobile" ? "text-sm" : "text-base"}`}
              >
                Board view
              </span>
              <div
                className={`h-0.5 rounded-full mt-1 ${
                  isDark ? "bg-dark-text" : "bg-brand-dark"
                } ${screenSize === "mobile" ? "w-16" : "w-20"}`}
              />
            </div>
          </div>

          {/* Additional Views - Desktop only */}
          {screenSize === "desktop" && (
            <button
              className={`flex items-center space-x-2 text-brand-dark/40 hover:text-brand-dark/60 transition-colors ${
                screenSize === "tablet" ? "text-sm" : "text-base"
              }`}
            >
              <div
                className={`rounded-full border border-brand-gray-300 flex items-center justify-center ${
                  screenSize === "tablet" ? "w-5 h-5" : "w-6 h-6"
                }`}
              >
                <svg
                  className={`text-brand-dark/40 ${
                    screenSize === "tablet" ? "w-2.5 h-2.5" : "w-3 h-3"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <span
                className={`text-brand-dark/50 font-semibold ${
                  screenSize === "tablet" ? "text-sm" : "text-base"
                }`}
              >
                Add view
              </span>
            </button>
          )}
        </div>

        {/* Right Side - Actions */}
        <div
          className={`flex items-center ${
            screenSize === "mobile" ? "space-x-2" : "space-x-4"
          }`}
        >
          {/* Filter/Sort - Tablet/Desktop only */}
          {screenSize !== "mobile" && (
            <>
              <button
                className={`${
                  isDark ? "text-dark-text" : "text-brand-dark"
                } font-semibold ${
                  isDark
                    ? "hover:text-dark-text/80"
                    : "hover:text-brand-dark/80"
                } transition-colors ${
                  screenSize === "tablet" ? "text-sm" : "text-base"
                }`}
              >
                Filter
              </button>
              <button
                className={`${
                  isDark ? "text-dark-text-secondary" : "text-brand-dark/50"
                } font-semibold ${
                  isDark
                    ? "hover:text-dark-text/70"
                    : "hover:text-brand-dark/70"
                } transition-colors ${
                  screenSize === "tablet" ? "text-sm" : "text-base"
                }`}
              >
                Sort
              </button>

              {/* More Menu */}
              <button
                className={`rounded-full border flex items-center justify-center transition-colors ${
                  isDark
                    ? "bg-dark-card border-dark-border hover:bg-dark-accent"
                    : "bg-white border-brand-gray-300 hover:bg-brand-gray-50"
                } ${screenSize === "tablet" ? "w-6 h-6" : "w-7 h-7"}`}
              >
                <svg
                  className={`${
                    isDark ? "text-dark-text" : "text-brand-dark"
                  } ${screenSize === "tablet" ? "w-3 h-3" : "w-4 h-4"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <circle cx="10" cy="4" r="1.5" />
                  <circle cx="10" cy="10" r="1.5" />
                  <circle cx="10" cy="16" r="1.5" />
                </svg>
              </button>
            </>
          )}

          {/* New Template Button */}
          <button
            onClick={onCreateTask}
            className={`flex items-center space-x-2 bg-brand-dark text-white rounded-2xl font-semibold hover:bg-brand-dark/90 transition-colors ${
              screenSize === "mobile"
                ? "px-3 py-2 text-xs"
                : screenSize === "tablet"
                  ? "px-4 py-2 text-sm"
                  : "px-6 py-3 text-sm"
            }`}
          >
            {screenSize === "mobile" ? (
              <>
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>Task</span>
              </>
            ) : (
              <span>
                {screenSize === "tablet" ? "New Task" : "New template"}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
