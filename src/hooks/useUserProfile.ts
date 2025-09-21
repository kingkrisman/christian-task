import { useState, useCallback } from "react";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "admin" | "manager" | "member";
  department: string;
  joinDate: string;
  timezone: string;
  status: "online" | "away" | "busy" | "offline";
  bio: string;
  skills: string[];
  preferences: {
    notifications: {
      email: boolean;
      push: boolean;
      mentions: boolean;
      taskUpdates: boolean;
      deadlines: boolean;
    };
    theme: "light" | "dark" | "system";
    language: string;
    workingHours: {
      start: string;
      end: string;
      timezone: string;
    };
  };
  stats: {
    tasksCompleted: number;
    tasksInProgress: number;
    projectsActive: number;
    collaborators: number;
  };
}

const defaultUser: UserProfile = {
  id: "current-user",
  name: "Vincent",
  email: "vincent@taskflow.com",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face",
  role: "admin",
  department: "Design",
  joinDate: "2022-01-15",
  timezone: "UTC-8",
  status: "online",
  bio: "Passionate UX/UI designer with 5+ years of experience creating user-centered digital experiences.",
  skills: [
    "UI/UX Design",
    "Figma",
    "Adobe Creative Suite",
    "Prototyping",
    "User Research",
  ],
  preferences: {
    notifications: {
      email: true,
      push: true,
      mentions: true,
      taskUpdates: true,
      deadlines: true,
    },
    theme: "dark",
    language: "en",
    workingHours: {
      start: "09:00",
      end: "17:00",
      timezone: "UTC-8",
    },
  },
  stats: {
    tasksCompleted: 47,
    tasksInProgress: 8,
    projectsActive: 3,
    collaborators: 12,
  },
};

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile>(defaultUser);
  const [isEditing, setIsEditing] = useState(false);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  }, []);

  const updatePreferences = useCallback(
    (preferences: Partial<UserProfile["preferences"]>) => {
      setProfile((prev) => ({
        ...prev,
        preferences: { ...prev.preferences, ...preferences },
      }));
    },
    [],
  );

  const updateNotificationSettings = useCallback(
    (notifications: Partial<UserProfile["preferences"]["notifications"]>) => {
      setProfile((prev) => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          notifications: {
            ...prev.preferences.notifications,
            ...notifications,
          },
        },
      }));
    },
    [],
  );

  const updateStatus = useCallback((status: UserProfile["status"]) => {
    setProfile((prev) => ({ ...prev, status }));
  }, []);

  const addSkill = useCallback((skill: string) => {
    setProfile((prev) => ({
      ...prev,
      skills: [...prev.skills, skill],
    }));
  }, []);

  const removeSkill = useCallback((skillToRemove: string) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  }, []);

  const uploadAvatar = useCallback(
    (file: File) => {
      // In a real app, this would upload to a server
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          updateProfile({ avatar: e.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    },
    [updateProfile],
  );

  return {
    profile,
    isEditing,
    setIsEditing,
    updateProfile,
    updatePreferences,
    updateNotificationSettings,
    updateStatus,
    addSkill,
    removeSkill,
    uploadAvatar,
  };
};
