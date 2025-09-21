import React, { useState, useEffect } from "react";
import { LeftSidebar } from "../components/LeftSidebar";
import { Sidebar } from "../components/Sidebar";
import { KanbanBoard } from "../components/KanbanBoard";
import { Menu, X, Settings, Folder } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export default function Index() {
  const { isDark } = useTheme();
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">(
    "desktop",
  );

  // Detect screen size changes
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize("mobile");
      } else if (width < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Close sidebars when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (screenSize === "mobile" && (leftSidebarOpen || rightSidebarOpen)) {
        const target = event.target as Element;
        if (
          !target.closest(".sidebar-content") &&
          !target.closest(".sidebar-toggle")
        ) {
          setLeftSidebarOpen(false);
          setRightSidebarOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [leftSidebarOpen, rightSidebarOpen, screenSize]);

  // Prevent body scroll when sidebars are open on mobile
  useEffect(() => {
    if (screenSize === "mobile" && (leftSidebarOpen || rightSidebarOpen)) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [leftSidebarOpen, rightSidebarOpen, screenSize]);

  return (
    <div
      className={`flex w-full min-h-screen relative ${
        isDark ? "bg-dark-primary" : "bg-white"
      }`}
    >
      {/* Mobile Navigation Bar */}
      {screenSize === "mobile" && (
        <div
          className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between border-b ${
            isDark
              ? "bg-dark-primary border-dark-border"
              : "bg-white border-brand-gray-200"
          }`}
        >
          <button
            onClick={() => setLeftSidebarOpen(true)}
            className={`sidebar-toggle flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
              isDark
                ? "bg-dark-accent hover:bg-dark-border"
                : "bg-brand-gray-100 hover:bg-brand-gray-200"
            }`}
          >
            <Menu
              className={`w-5 h-5 ${isDark ? "text-dark-text" : "text-brand-dark"}`}
            />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-brand-dark rounded-lg flex items-center justify-center">
              <svg width="16" height="18" viewBox="0 0 24 26" fill="none">
                <path
                  d="M24 8.88887L14 4V5.46663L22.5 9.62219L14 13.7777V26L24 21.1111V8.88887Z"
                  fill="white"
                />
                <path
                  d="M0 17.1111L10 22V20.5334L1.49996 16.3778L10 12.2223V0L0 4.88888V17.1111Z"
                  fill="white"
                />
              </svg>
            </div>
            <span
              className={`text-lg font-bold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
            >
              TaskFlow
            </span>
          </div>

          <button
            onClick={() => setRightSidebarOpen(true)}
            className={`sidebar-toggle flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
              isDark
                ? "bg-dark-accent hover:bg-dark-border"
                : "bg-brand-gray-100 hover:bg-brand-gray-200"
            }`}
          >
            <Folder
              className={`w-5 h-5 ${isDark ? "text-dark-text" : "text-brand-dark"}`}
            />
          </button>
        </div>
      )}

      {/* Tablet Navigation Buttons */}
      {screenSize === "tablet" && (
        <>
          <button
            onClick={() => setLeftSidebarOpen(true)}
            className={`sidebar-toggle fixed top-4 left-4 z-50 shadow-lg rounded-lg p-2 border transition-colors ${
              isDark
                ? "bg-dark-card border-dark-border hover:bg-dark-tertiary"
                : "bg-white border-brand-gray-200 hover:bg-brand-gray-50"
            }`}
          >
            <Menu
              className={`w-5 h-5 ${isDark ? "text-dark-text" : "text-brand-dark"}`}
            />
          </button>

          <button
            onClick={() => setRightSidebarOpen(true)}
            className={`sidebar-toggle fixed top-4 left-20 z-50 shadow-lg rounded-lg px-3 py-2 border text-sm font-medium transition-colors ${
              isDark
                ? "bg-dark-card border-dark-border text-dark-text hover:bg-dark-tertiary"
                : "bg-white border-brand-gray-200 text-brand-dark hover:bg-brand-gray-50"
            }`}
          >
            Projects
          </button>
        </>
      )}

      {/* Mobile/Tablet Overlay */}
      {screenSize !== "desktop" && (leftSidebarOpen || rightSidebarOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
          onClick={() => {
            setLeftSidebarOpen(false);
            setRightSidebarOpen(false);
          }}
        />
      )}

      {/* Left Navigation Sidebar */}
      {screenSize === "desktop" && <LeftSidebar screenSize={screenSize} />}

      {/* Mobile Left Sidebar Overlay */}
      {screenSize !== "desktop" && leftSidebarOpen && (
        <div className="fixed inset-0 z-50">
          <LeftSidebar screenSize={screenSize} />
          <button
            onClick={() => setLeftSidebarOpen(false)}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 rounded-lg p-2 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      )}

      {/* Project Sidebar */}
      {screenSize === "desktop" && <Sidebar screenSize={screenSize} />}

      {/* Mobile Project Sidebar Overlay */}
      {screenSize !== "desktop" && rightSidebarOpen && (
        <div className="fixed inset-0 z-40">
          <Sidebar screenSize={screenSize} />
          <button
            onClick={() => setRightSidebarOpen(false)}
            className="absolute top-4 right-4 bg-brand-gray-100 hover:bg-brand-gray-200 rounded-lg p-2 transition-colors"
          >
            <X className="w-4 h-4 text-brand-dark" />
          </button>
        </div>
      )}

      {/* Main Kanban Board Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 ${
          screenSize === "mobile"
            ? "pt-16"
            : screenSize === "tablet"
              ? "ml-[288px]"
              : "ml-[408px]"
        }`}
      >
        <KanbanBoard screenSize={screenSize} />
      </div>
    </div>
  );
}
