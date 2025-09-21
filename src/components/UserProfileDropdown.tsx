import React, { useState, useRef, useEffect } from "react";
import {
  User,
  Settings,
  LogOut,
  Moon,
  Sun,
  Monitor,
  Edit,
  Crown,
  Mail,
  Clock,
  MapPin,
  Calendar,
  Trophy,
  Users,
  CheckCircle,
  Circle,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useUserProfile } from "../hooks/useUserProfile";

interface UserProfileDropdownProps {
  screenSize: "mobile" | "tablet" | "desktop";
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "online":
      return "bg-green-400";
    case "away":
      return "bg-yellow-400";
    case "busy":
      return "bg-red-400";
    case "offline":
      return "bg-gray-400";
    default:
      return "bg-gray-400";
  }
};

const getRoleIcon = (role: string) => {
  switch (role) {
    case "admin":
      return <Crown className="w-3 h-3 text-yellow-500" />;
    case "manager":
      return <Users className="w-3 h-3 text-blue-500" />;
    default:
      return <User className="w-3 h-3 text-gray-500" />;
  }
};

export const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({
  screenSize,
}) => {
  const { isDark, toggleTheme } = useTheme();
  const { profile, updateStatus } = useUserProfile();
  const [isOpen, setIsOpen] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setShowStatusMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const statusOptions = [
    { value: "online", label: "Online", icon: Circle },
    { value: "away", label: "Away", icon: Clock },
    { value: "busy", label: "Busy", icon: Circle },
    { value: "offline", label: "Offline", icon: Circle },
  ];

  const handleStatusChange = (
    status: "online" | "away" | "busy" | "offline",
  ) => {
    updateStatus(status);
    setShowStatusMenu(false);
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log("Logging out...");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative rounded-full overflow-hidden border-2 transition-all duration-200 ${
          isDark
            ? "border-dark-border hover:border-dark-text/50"
            : "border-brand-gray-200 hover:border-brand-gray-300"
        } ${
          screenSize === "mobile"
            ? "w-8 h-8"
            : screenSize === "tablet"
              ? "w-9 h-9"
              : "w-10 h-10"
        } ${isOpen ? "ring-2 ring-blue-500 ring-opacity-50" : ""}`}
      >
        <img
          src={profile.avatar}
          alt={profile.name}
          className="w-full h-full object-cover"
        />

        {/* Status Indicator */}
        <div
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 ${
            isDark ? "border-dark-primary" : "border-white"
          } ${getStatusColor(profile.status)}`}
        />
      </button>

      {/* Profile Dropdown */}
      {isOpen && (
        <div
          className={`absolute right-0 mt-2 border rounded-xl shadow-xl z-50 ${
            isDark
              ? "bg-dark-card border-dark-border"
              : "bg-white border-brand-gray-200"
          } ${screenSize === "mobile" ? "w-80" : "w-96"}`}
        >
          {/* Profile Header */}
          <div
            className={`p-4 border-b ${isDark ? "border-dark-border" : "border-brand-gray-100"}`}
          >
            <div className="flex items-start space-x-3">
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div
                  className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 ${
                    isDark ? "border-dark-card" : "border-white"
                  } ${getStatusColor(profile.status)}`}
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3
                    className={`font-semibold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                  >
                    {profile.name}
                  </h3>
                  {getRoleIcon(profile.role)}
                </div>
                <p
                  className={`text-sm ${isDark ? "text-dark-text-secondary" : "text-brand-dark/70"}`}
                >
                  {profile.email}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      profile.role === "admin"
                        ? "bg-yellow-100 text-yellow-700"
                        : profile.role === "manager"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {profile.role.charAt(0).toUpperCase() +
                      profile.role.slice(1)}
                  </span>
                  <span
                    className={`text-xs ${isDark ? "text-dark-text-muted" : "text-brand-dark/50"}`}
                  >
                    {profile.department}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-3 mt-4">
              <div className="text-center">
                <p
                  className={`text-lg font-bold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                >
                  {profile.stats.tasksCompleted}
                </p>
                <p
                  className={`text-xs ${isDark ? "text-dark-text-muted" : "text-brand-dark/50"}`}
                >
                  Completed
                </p>
              </div>
              <div className="text-center">
                <p
                  className={`text-lg font-bold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                >
                  {profile.stats.tasksInProgress}
                </p>
                <p
                  className={`text-xs ${isDark ? "text-dark-text-muted" : "text-brand-dark/50"}`}
                >
                  In Progress
                </p>
              </div>
              <div className="text-center">
                <p
                  className={`text-lg font-bold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                >
                  {profile.stats.projectsActive}
                </p>
                <p
                  className={`text-xs ${isDark ? "text-dark-text-muted" : "text-brand-dark/50"}`}
                >
                  Projects
                </p>
              </div>
              <div className="text-center">
                <p
                  className={`text-lg font-bold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                >
                  {profile.stats.collaborators}
                </p>
                <p
                  className={`text-xs ${isDark ? "text-dark-text-muted" : "text-brand-dark/50"}`}
                >
                  Team
                </p>
              </div>
            </div>
          </div>

          {/* Status Section */}
          <div
            className={`p-3 border-b ${isDark ? "border-dark-border" : "border-brand-gray-100"}`}
          >
            <div className="relative">
              <button
                onClick={() => setShowStatusMenu(!showStatusMenu)}
                className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                  isDark ? "hover:bg-dark-accent" : "hover:bg-brand-gray-50"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${getStatusColor(profile.status)}`}
                  />
                  <span
                    className={`text-sm font-medium ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                  >
                    {profile.status.charAt(0).toUpperCase() +
                      profile.status.slice(1)}
                  </span>
                </div>
                <Edit
                  className={`w-3 h-3 ${isDark ? "text-dark-text-muted" : "text-brand-dark/50"}`}
                />
              </button>

              {/* Status Menu */}
              {showStatusMenu && (
                <div
                  className={`absolute top-full left-0 right-0 mt-1 border rounded-lg shadow-lg z-50 ${
                    isDark
                      ? "bg-dark-card border-dark-border"
                      : "bg-white border-brand-gray-200"
                  }`}
                >
                  {statusOptions.map((status) => (
                    <button
                      key={status.value}
                      onClick={() => handleStatusChange(status.value as any)}
                      className={`w-full flex items-center space-x-2 p-2 text-sm transition-colors ${
                        profile.status === status.value
                          ? isDark
                            ? "bg-dark-accent"
                            : "bg-brand-gray-100"
                          : isDark
                            ? "hover:bg-dark-accent/50"
                            : "hover:bg-brand-gray-50"
                      } first:rounded-t-lg last:rounded-b-lg`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${getStatusColor(status.value)}`}
                      />
                      <span
                        className={
                          isDark ? "text-dark-text" : "text-brand-dark"
                        }
                      >
                        {status.label}
                      </span>
                      {profile.status === status.value && (
                        <CheckCircle
                          className={`w-3 h-3 ml-auto ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            {/* View Profile */}
            <button
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isDark
                  ? "hover:bg-dark-accent text-dark-text"
                  : "hover:bg-brand-gray-50 text-brand-dark"
              }`}
            >
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">View Profile</span>
            </button>

            {/* Settings */}
            <button
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isDark
                  ? "hover:bg-dark-accent text-dark-text"
                  : "hover:bg-brand-gray-50 text-brand-dark"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm font-medium">Settings</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                isDark
                  ? "hover:bg-dark-accent text-dark-text"
                  : "hover:bg-brand-gray-50 text-brand-dark"
              }`}
            >
              <div className="flex items-center space-x-3">
                {isDark ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">
                  {isDark ? "Light Mode" : "Dark Mode"}
                </span>
              </div>
            </button>

            {/* Divider */}
            <div
              className={`my-2 border-t ${isDark ? "border-dark-border" : "border-brand-gray-100"}`}
            />

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 p-3 rounded-lg transition-colors text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
