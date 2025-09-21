import React, { useState, useRef, useEffect } from "react";
import {
  Bell,
  X,
  Check,
  MoreHorizontal,
  Clock,
  User,
  MessageCircle,
  AlertTriangle,
  Settings,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useNotifications, Notification } from "../hooks/useNotifications";

interface NotificationDropdownProps {
  screenSize: "mobile" | "tablet" | "desktop";
}

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "task":
      return <Check className="w-4 h-4 text-blue-500" />;
    case "mention":
      return <User className="w-4 h-4 text-purple-500" />;
    case "deadline":
      return <Clock className="w-4 h-4 text-orange-500" />;
    case "comment":
      return <MessageCircle className="w-4 h-4 text-green-500" />;
    case "system":
      return <Settings className="w-4 h-4 text-gray-500" />;
    default:
      return <Bell className="w-4 h-4 text-blue-500" />;
  }
};

const getTimeAgo = (timestamp: Date) => {
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  screenSize,
}) => {
  const { isDark } = useTheme();
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
  } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredNotifications =
    filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    // Handle navigation to task/action if needed
    if (notification.actionUrl) {
      // Navigate to URL
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex items-center justify-center rounded-lg transition-colors ${
          isDark ? "hover:bg-dark-accent" : "hover:bg-brand-gray-100"
        } ${
          screenSize === "mobile"
            ? "w-8 h-8"
            : screenSize === "tablet"
              ? "w-9 h-9"
              : "w-10 h-10"
        }`}
      >
        <Bell
          className={`${
            isDark ? "text-dark-text-secondary" : "text-brand-dark/60"
          } ${screenSize === "mobile" ? "w-4 h-4" : "w-5 h-5"}`}
        />

        {/* Notification Badge */}
        {unreadCount > 0 && (
          <div
            className={`absolute bg-brand-orange rounded-full border-2 flex items-center justify-center ${
              isDark ? "border-dark-primary" : "border-white"
            } ${
              screenSize === "mobile"
                ? "w-4 h-4 -top-1 -right-1 text-[10px]"
                : "w-5 h-5 -top-1.5 -right-1.5 text-xs"
            } text-white font-bold`}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </div>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div
          className={`absolute right-0 mt-2 border rounded-xl shadow-xl z-50 ${
            isDark
              ? "bg-dark-card border-dark-border"
              : "bg-white border-brand-gray-200"
          } ${
            screenSize === "mobile" ? "w-80 max-h-96" : "w-96 max-h-[32rem]"
          }`}
        >
          {/* Header */}
          <div
            className={`px-4 py-3 border-b ${
              isDark ? "border-dark-border" : "border-brand-gray-100"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3
                className={`font-semibold ${
                  isDark ? "text-dark-text" : "text-brand-dark"
                } ${screenSize === "mobile" ? "text-base" : "text-lg"}`}
              >
                Notifications
              </h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className={`text-xs font-medium px-2 py-1 rounded-md transition-colors ${
                      isDark
                        ? "text-dark-text-secondary hover:bg-dark-accent"
                        : "text-brand-dark/60 hover:bg-brand-gray-100"
                    }`}
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className={`p-1 rounded-md transition-colors ${
                    isDark
                      ? "hover:bg-dark-accent text-dark-text-secondary"
                      : "hover:bg-brand-gray-100 text-brand-dark/60"
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex mt-3">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                  filter === "all"
                    ? isDark
                      ? "bg-dark-text text-dark-primary"
                      : "bg-brand-dark text-white"
                    : isDark
                      ? "text-dark-text-secondary hover:bg-dark-accent"
                      : "text-brand-dark/60 hover:bg-brand-gray-100"
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                onClick={() => setFilter("unread")}
                className={`ml-2 px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                  filter === "unread"
                    ? isDark
                      ? "bg-dark-text text-dark-primary"
                      : "bg-brand-dark text-white"
                    : isDark
                      ? "text-dark-text-secondary hover:bg-dark-accent"
                      : "text-brand-dark/60 hover:bg-brand-gray-100"
                }`}
              >
                Unread ({unreadCount})
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell
                  className={`w-12 h-12 mx-auto mb-3 ${
                    isDark ? "text-dark-text-muted" : "text-brand-dark/30"
                  }`}
                />
                <p
                  className={`text-sm ${
                    isDark ? "text-dark-text-secondary" : "text-brand-dark/60"
                  }`}
                >
                  {filter === "unread"
                    ? "No unread notifications"
                    : "No notifications yet"}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-brand-gray-100">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`p-4 cursor-pointer transition-colors relative ${
                      !notification.read
                        ? isDark
                          ? "bg-dark-accent/30 hover:bg-dark-accent/50"
                          : "bg-blue-50/50 hover:bg-blue-50"
                        : isDark
                          ? "hover:bg-dark-accent/20"
                          : "hover:bg-brand-gray-50"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Avatar or Icon */}
                      <div className="flex-shrink-0">
                        {notification.avatar ? (
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            <img
                              src={notification.avatar}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              isDark ? "bg-dark-border" : "bg-brand-gray-200"
                            }`}
                          >
                            {getNotificationIcon(notification.type)}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p
                              className={`text-sm font-medium ${
                                isDark ? "text-dark-text" : "text-brand-dark"
                              }`}
                            >
                              {notification.title}
                            </p>
                            <p
                              className={`text-sm mt-1 ${
                                isDark
                                  ? "text-dark-text-secondary"
                                  : "text-brand-dark/70"
                              }`}
                            >
                              {notification.message}
                            </p>
                            <div className="flex items-center mt-2">
                              <span
                                className={`text-xs ${
                                  isDark
                                    ? "text-dark-text-muted"
                                    : "text-brand-dark/50"
                                }`}
                              >
                                {getTimeAgo(notification.timestamp)}
                              </span>
                              {notification.urgent && (
                                <div className="flex items-center ml-2">
                                  <AlertTriangle className="w-3 h-3 text-orange-500 mr-1" />
                                  <span className="text-xs text-orange-500 font-medium">
                                    Urgent
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center space-x-1 ml-2">
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNotification(notification.id);
                              }}
                              className={`p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity ${
                                isDark
                                  ? "hover:bg-dark-border text-dark-text-muted"
                                  : "hover:bg-brand-gray-200 text-brand-dark/50"
                              }`}
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {filteredNotifications.length > 0 && (
            <div
              className={`px-4 py-3 border-t ${
                isDark ? "border-dark-border" : "border-brand-gray-100"
              }`}
            >
              <button
                className={`w-full text-sm font-medium py-2 rounded-lg transition-colors ${
                  isDark
                    ? "text-dark-text-secondary hover:bg-dark-accent"
                    : "text-brand-dark/60 hover:bg-brand-gray-100"
                }`}
              >
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
