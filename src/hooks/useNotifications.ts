import { useState, useEffect, useCallback } from "react";

export interface Notification {
  id: string;
  type: "task" | "mention" | "deadline" | "comment" | "system";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  urgent: boolean;
  actionUrl?: string;
  avatar?: string;
  taskId?: string;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "task",
      title: "Task Assigned",
      message: "You were assigned to 'Design new ui presentation'",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      urgent: false,
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612cad5?w=32&h=32&fit=crop&crop=face",
      taskId: "1",
    },
    {
      id: "2",
      type: "deadline",
      title: "Deadline Approaching",
      message: "Task 'Add more ui/ux mockups' is due tomorrow",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false,
      urgent: true,
      taskId: "2",
    },
    {
      id: "3",
      type: "comment",
      title: "New Comment",
      message: "Sarah commented on 'Design few mobile screens'",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: true,
      urgent: false,
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612cad5?w=32&h=32&fit=crop&crop=face",
      taskId: "3",
    },
    {
      id: "4",
      type: "mention",
      title: "You were mentioned",
      message: "John mentioned you in project discussion",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true,
      urgent: false,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    },
    {
      id: "5",
      type: "system",
      title: "System Update",
      message: "New features have been added to TaskFlow",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: true,
      urgent: false,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification,
      ),
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true })),
    );
  }, []);

  const removeNotification = useCallback((notificationId: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== notificationId),
    );
  }, []);

  const addNotification = useCallback(
    (notification: Omit<Notification, "id" | "timestamp">) => {
      const newNotification: Notification = {
        ...notification,
        id: Date.now().toString(),
        timestamp: new Date(),
      };
      setNotifications((prev) => [newNotification, ...prev]);
    },
    [],
  );

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add notifications for demo purposes
      if (Math.random() < 0.1) {
        // 10% chance every 30 seconds
        const notifications = [
          {
            type: "task" as const,
            title: "New Task Created",
            message: "A new task has been added to your board",
            read: false,
            urgent: false,
          },
          {
            type: "comment" as const,
            title: "New Comment",
            message: "Someone commented on your task",
            read: false,
            urgent: false,
            avatar:
              "https://images.unsplash.com/photo-1494790108755-2616b612cad5?w=32&h=32&fit=crop&crop=face",
          },
        ];

        const randomNotification =
          notifications[Math.floor(Math.random() * notifications.length)];
        addNotification(randomNotification);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [addNotification]);

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    addNotification,
  };
};
