import { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export interface NavigationItem {
  id: string;
  icon: string;
  label: string;
  active: boolean;
  badge?: number;
  onClick?: () => void;
}

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("dashboard");
  const [globalSearchOpen, setGlobalSearchOpen] = useState(false);

  // Update active item based on current route
  useEffect(() => {
    const path = location.pathname;
    switch (path) {
      case "/":
        setActiveItem("dashboard");
        break;
      case "/projects":
        setActiveItem("projects");
        break;
      case "/tasks":
        setActiveItem("tasks");
        break;
      case "/team":
        setActiveItem("team");
        break;
      case "/calendar":
        setActiveItem("calendar");
        break;
      case "/reports":
        setActiveItem("reports");
        break;
      case "/settings":
        setActiveItem("settings");
        break;
      case "/profile":
        setActiveItem("profile");
        break;
      default:
        setActiveItem("dashboard");
    }
  }, [location.pathname]);

  const navigationItems: NavigationItem[] = [
    {
      id: "dashboard",
      icon: "dashboard",
      label: "Dashboard",
      active: activeItem === "dashboard",
      onClick: () => handleNavigation("/"),
    },
    {
      id: "projects",
      icon: "cloud",
      label: "Projects",
      active: activeItem === "projects",
      onClick: () => handleNavigation("/projects"),
    },
    {
      id: "tasks",
      icon: "chart",
      label: "Tasks",
      active: activeItem === "tasks",
      badge: 3,
      onClick: () => handleNavigation("/tasks"),
    },
    {
      id: "team",
      icon: "user",
      label: "Team",
      active: activeItem === "team",
      onClick: () => handleNavigation("/team"),
    },
    {
      id: "calendar",
      icon: "calendar",
      label: "Calendar",
      active: activeItem === "calendar",
      onClick: () => handleNavigation("/calendar"),
    },
    {
      id: "reports",
      icon: "map",
      label: "Reports",
      active: activeItem === "reports",
      onClick: () => handleNavigation("/reports"),
    },
    {
      id: "settings",
      icon: "settings",
      label: "Settings",
      active: activeItem === "settings",
      onClick: () => handleNavigation("/settings"),
    },
  ];

  const handleNavigation = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate],
  );

  const openGlobalSearch = useCallback(() => {
    setGlobalSearchOpen(true);
  }, []);

  const closeGlobalSearch = useCallback(() => {
    setGlobalSearchOpen(false);
  }, []);

  // Keyboard shortcuts
  const handleKeyboardShortcuts = useCallback(
    (event: KeyboardEvent) => {
      // Global search: Cmd/Ctrl + K
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        openGlobalSearch();
      }

      // Quick navigation shortcuts
      if ((event.metaKey || event.ctrlKey) && event.shiftKey) {
        switch (event.key) {
          case "D":
            event.preventDefault();
            handleNavigation("dashboard");
            break;
          case "U":
            event.preventDefault();
            handleNavigation("users");
            break;
          case "C":
            event.preventDefault();
            handleNavigation("calendar");
            break;
          case "A":
            event.preventDefault();
            handleNavigation("analytics");
            break;
          case "S":
            event.preventDefault();
            handleNavigation("settings");
            break;
          default:
            break;
        }
      }
    },
    [handleNavigation, openGlobalSearch],
  );

  return {
    navigationItems,
    activeItem,
    globalSearchOpen,
    handleNavigation,
    openGlobalSearch,
    closeGlobalSearch,
    handleKeyboardShortcuts,
  };
};
