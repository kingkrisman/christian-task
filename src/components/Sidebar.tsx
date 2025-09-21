import React, { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Plus,
  Search,
  Bell,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react";
import { taskCounts } from "../lib/data";
import { useTheme } from "../contexts/ThemeContext";
import { useProjectManager } from "../hooks/useProjectManager";
import { ProjectModal } from "./ProjectModal";

interface SidebarProps {
  screenSize: "mobile" | "tablet" | "desktop";
}

export const Sidebar: React.FC<SidebarProps> = ({ screenSize }) => {
  const { isDark, toggleTheme } = useTheme();
  const [projectsExpanded, setProjectsExpanded] = useState(true);
  const [tasksExpanded, setTasksExpanded] = useState(true);
  const [projectModal, setProjectModal] = useState<{
    isOpen: boolean;
    mode: "create" | "edit";
    project?: any;
  }>({
    isOpen: false,
    mode: "create",
    project: null,
  });
  const [activeProjectMenu, setActiveProjectMenu] = useState<string | null>(
    null,
  );

  const {
    projects,
    selectedProject,
    selectProject,
    createProject,
    updateProject,
    deleteProject,
    duplicateProject,
  } = useProjectManager();

  const handleCreateProject = () => {
    setProjectModal({ isOpen: true, mode: "create", project: null });
  };

  const handleEditProject = (project: any) => {
    setProjectModal({ isOpen: true, mode: "edit", project });
    setActiveProjectMenu(null);
  };

  const handleDeleteProject = (projectId: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      deleteProject(projectId);
      setActiveProjectMenu(null);
    }
  };

  const handleDuplicateProject = (projectId: string) => {
    duplicateProject(projectId);
    setActiveProjectMenu(null);
  };

  const handleSaveProject = (projectData: any) => {
    if (projectModal.mode === "create") {
      createProject({
        ...projectData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        count: 0,
      });
    } else if (projectModal.project) {
      updateProject(projectModal.project.id, projectData);
    }
    setProjectModal({ isOpen: false, mode: "create", project: null });
  };

  return (
    <div
      className={`flex flex-col h-screen max-h-screen overflow-hidden shadow-sidebar border-r fixed top-0 z-40 ${
        isDark
          ? "bg-dark-secondary border-dark-border"
          : "bg-white border-brand-gray-200"
      } ${
        screenSize === "mobile"
          ? "w-80 min-w-80"
          : screenSize === "tablet"
            ? "w-72 min-w-72 left-20"
            : "w-[318px] min-w-[318px] left-[90px]"
      }`}
    >
      {/* Header */}
      <div
        className={`border-b ${
          isDark ? "border-dark-border" : "border-brand-gray-100"
        } ${screenSize === "mobile" ? "p-4 pb-4" : "p-6 lg:p-7 pb-6"}`}
      >
        <div className="flex items-center justify-between mb-4">
          <h1
            className={`font-bold ${
              isDark ? "text-dark-text" : "text-brand-dark"
            } ${screenSize === "mobile" ? "text-2xl" : "text-3xl"}`}
          >
            Projects
          </h1>
          <button
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
              isDark
                ? "bg-dark-border hover:bg-dark-accent"
                : "bg-brand-gray-200 hover:bg-brand-gray-300"
            }`}
          >
            <Plus
              className={`w-4 h-4 ${
                isDark ? "text-dark-text" : "text-brand-dark"
              }`}
            />
          </button>
        </div>

        {/* Search - Mobile/Tablet only */}
        {screenSize !== "desktop" && (
          <div className="relative">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                isDark ? "text-dark-text-muted" : "text-brand-dark/40"
              }`}
            />
            <input
              type="text"
              placeholder="Search projects..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors ${
                isDark
                  ? "bg-dark-accent border-dark-border text-dark-text placeholder-dark-text-secondary"
                  : "bg-brand-gray-100 text-brand-dark"
              }`}
            />
          </div>
        )}
      </div>

      {/* Navigation Content */}
      <div className="flex-1 overflow-y-auto">
        <div
          className={`space-y-8 lg:space-y-11 ${
            screenSize === "mobile" ? "p-4" : "p-6 lg:p-7"
          }`}
        >
          {/* Quick Actions (Mobile only) */}
          {screenSize === "mobile" && (
            <div className="space-y-3">
              <h3
                className={`text-sm font-semibold uppercase tracking-wide ${
                  isDark ? "text-dark-text-secondary" : "text-brand-dark/70"
                }`}
              >
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center p-4 bg-brand-success/10 rounded-xl hover:bg-brand-success/20 transition-colors">
                  <Plus className="w-6 h-6 text-brand-success mb-2" />
                  <span className="text-sm font-medium text-brand-success">
                    New Task
                  </span>
                </button>
                <button className="flex flex-col items-center p-4 bg-brand-blue/10 rounded-xl hover:bg-brand-blue/20 transition-colors">
                  <Bell className="w-6 h-6 text-brand-blue mb-2" />
                  <span className="text-sm font-medium text-brand-blue">
                    Notifications
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Team Section */}
          <div>
            <div className="flex items-center justify-between mb-0">
              <span
                className={`font-bold ${
                  isDark ? "text-dark-text-secondary" : "text-brand-dark/50"
                } ${screenSize === "mobile" ? "text-sm" : "text-base"}`}
              >
                Team
              </span>
            </div>
          </div>

          {/* Projects Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setProjectsExpanded(!projectsExpanded)}
                className="flex items-center space-x-2 group"
              >
                {projectsExpanded ? (
                  <ChevronDown
                    className={`w-4 h-4 ${
                      isDark ? "text-dark-text-secondary" : "text-brand-dark/50"
                    } group-hover:${
                      isDark ? "text-dark-text" : "text-brand-dark"
                    } transition-colors`}
                  />
                ) : (
                  <ChevronRight
                    className={`w-4 h-4 ${
                      isDark ? "text-dark-text-secondary" : "text-brand-dark/50"
                    } group-hover:${
                      isDark ? "text-dark-text" : "text-brand-dark"
                    } transition-colors`}
                  />
                )}
                <span
                  className={`font-bold group-hover:${
                    isDark ? "text-dark-text" : "text-brand-dark"
                  } transition-colors ${
                    isDark ? "text-dark-text-secondary" : "text-brand-dark/50"
                  } ${screenSize === "mobile" ? "text-sm" : "text-base"}`}
                >
                  Projects ({projects.length})
                </span>
              </button>

              <button
                onClick={handleCreateProject}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                  isDark
                    ? "bg-dark-border hover:bg-dark-accent"
                    : "bg-brand-gray-200 hover:bg-brand-gray-300"
                }`}
                title="Create new project"
              >
                <Plus
                  className={`w-4 h-4 ${
                    isDark ? "text-dark-text" : "text-brand-dark"
                  }`}
                />
              </button>
            </div>

            {projectsExpanded && (
              <div className="space-y-2">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className={`group flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors relative ${
                      selectedProject === project.id
                        ? isDark
                          ? "bg-dark-text text-dark-primary"
                          : "bg-brand-dark text-white"
                        : isDark
                          ? "hover:bg-dark-accent"
                          : "hover:bg-brand-gray-100"
                    }`}
                    onClick={() => selectProject(project.id)}
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          project.status === "active"
                            ? "bg-green-500"
                            : project.status === "completed"
                              ? "bg-blue-500"
                              : project.status === "on-hold"
                                ? "bg-yellow-500"
                                : "bg-gray-500"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium truncate ${
                          selectedProject === project.id
                            ? "text-white"
                            : isDark
                              ? "text-dark-text"
                              : "text-brand-dark"
                        }`}
                      >
                        {project.name}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          selectedProject === project.id
                            ? "bg-white/20 text-white"
                            : isDark
                              ? "bg-dark-border text-dark-text-secondary"
                              : "bg-brand-gray-200 text-brand-dark/60"
                        }`}
                      >
                        {project.count}
                      </span>

                      {/* Project Menu */}
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveProjectMenu(
                              activeProjectMenu === project.id
                                ? null
                                : project.id,
                            );
                          }}
                          className={`opacity-0 group-hover:opacity-100 p-1 rounded transition-all ${
                            selectedProject === project.id
                              ? "hover:bg-white/20"
                              : isDark
                                ? "hover:bg-dark-border"
                                : "hover:bg-brand-gray-300"
                          }`}
                        >
                          <MoreHorizontal className="w-3 h-3" />
                        </button>

                        {/* Dropdown Menu */}
                        {activeProjectMenu === project.id && (
                          <div
                            className={`absolute right-0 top-full mt-1 w-48 border rounded-lg shadow-lg z-50 py-1 ${
                              isDark
                                ? "bg-dark-card border-dark-border"
                                : "bg-white border-brand-gray-200"
                            }`}
                          >
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditProject(project);
                              }}
                              className={`w-full flex items-center space-x-2 px-3 py-2 text-sm transition-colors ${
                                isDark
                                  ? "text-dark-text hover:bg-dark-accent"
                                  : "text-brand-dark hover:bg-brand-gray-50"
                              }`}
                            >
                              <Edit className="w-3 h-3" />
                              <span>Edit Project</span>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDuplicateProject(project.id);
                              }}
                              className={`w-full flex items-center space-x-2 px-3 py-2 text-sm transition-colors ${
                                isDark
                                  ? "text-dark-text hover:bg-dark-accent"
                                  : "text-brand-dark hover:bg-brand-gray-50"
                              }`}
                            >
                              <Plus className="w-3 h-3" />
                              <span>Duplicate</span>
                            </button>
                            <div
                              className={`border-t my-1 ${
                                isDark
                                  ? "border-dark-border"
                                  : "border-brand-gray-100"
                              }`}
                            />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteProject(project.id);
                              }}
                              className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Delete Project</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tasks Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setTasksExpanded(!tasksExpanded)}
                className="flex items-center space-x-2 group"
              >
                {tasksExpanded ? (
                  <ChevronDown
                    className={`w-4 h-4 ${
                      isDark ? "text-dark-text-secondary" : "text-brand-dark/50"
                    } group-hover:${
                      isDark ? "text-dark-text" : "text-brand-dark"
                    } transition-colors`}
                  />
                ) : (
                  <ChevronRight
                    className={`w-4 h-4 ${
                      isDark ? "text-dark-text-secondary" : "text-brand-dark/50"
                    } group-hover:${
                      isDark ? "text-dark-text" : "text-brand-dark"
                    } transition-colors`}
                  />
                )}
                <span
                  className={`font-bold group-hover:${
                    isDark ? "text-dark-text" : "text-brand-dark"
                  } transition-colors ${
                    isDark ? "text-dark-text-secondary" : "text-brand-dark/50"
                  } ${screenSize === "mobile" ? "text-sm" : "text-base"}`}
                >
                  Tasks
                </span>
              </button>
            </div>

            {tasksExpanded && (
              <div className="space-y-2">
                <div
                  className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                    isDark ? "hover:bg-dark-accent" : "hover:bg-brand-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                    <span
                      className={`text-sm font-medium ${
                        isDark ? "text-dark-text" : "text-brand-dark"
                      }`}
                    >
                      To Do
                    </span>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      isDark
                        ? "bg-dark-border text-dark-text-secondary"
                        : "bg-brand-gray-200 text-brand-dark/60"
                    }`}
                  >
                    {taskCounts.todo}
                  </span>
                </div>

                <div
                  className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                    isDark ? "hover:bg-dark-accent" : "hover:bg-brand-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400" />
                    <span
                      className={`text-sm font-medium ${
                        isDark ? "text-dark-text" : "text-brand-dark"
                      }`}
                    >
                      In Progress
                    </span>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      isDark
                        ? "bg-dark-border text-dark-text-secondary"
                        : "bg-brand-gray-200 text-brand-dark/60"
                    }`}
                  >
                    {taskCounts.inprogress}
                  </span>
                </div>

                <div
                  className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                    isDark ? "hover:bg-dark-accent" : "hover:bg-brand-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span
                      className={`text-sm font-medium ${
                        isDark ? "text-dark-text" : "text-brand-dark"
                      }`}
                    >
                      Done
                    </span>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      isDark
                        ? "bg-dark-border text-dark-text-secondary"
                        : "bg-brand-gray-200 text-brand-dark/60"
                    }`}
                  >
                    {taskCounts.done}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle Section - Mobile only */}
          {screenSize === "mobile" && (
            <div className="pt-4 border-t border-brand-gray-200">
              <button
                onClick={toggleTheme}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                  isDark
                    ? "bg-dark-accent hover:bg-dark-border"
                    : "bg-brand-gray-100 hover:bg-brand-gray-200"
                }`}
              >
                <span
                  className={`text-sm font-medium ${
                    isDark ? "text-dark-text" : "text-brand-dark"
                  }`}
                >
                  {isDark ? "Light Mode" : "Dark Mode"}
                </span>
                <div
                  className={`w-10 h-6 rounded-full relative transition-colors ${
                    isDark ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      isDark ? "translate-x-5" : "translate-x-1"
                    }`}
                  />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Figma-style Theme Toggle - positioned at bottom like in Figma design */}
      <div className="p-7 pt-6">
        <div
          className="w-full h-[42px] rounded-[22px] p-1 flex items-center"
          style={{ backgroundColor: "rgba(28, 29, 34, 0.04)" }}
        >
          {/* Light Mode Button */}
          <button
            onClick={() => (isDark ? toggleTheme() : undefined)}
            className={`flex-1 h-[34px] rounded-[18px] flex items-center justify-center px-4 transition-all duration-200 cursor-pointer ${
              !isDark
                ? "bg-white shadow-[0px_8px_6px_0px_rgba(28,29,34,0.06)]"
                : "hover:bg-white/5"
            }`}
          >
            <svg
              className={`w-5 h-5 mr-2 ${!isDark ? "text-[#1C1D22]" : "text-[#1C1D22] opacity-50"}`}
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.99739 1.66602C10.4576 1.66602 10.8307 2.03911 10.8307 2.49935V3.33268C10.8307 3.79292 10.4576 4.16602 9.99739 4.16602C9.53716 4.16602 9.16406 3.79292 9.16406 3.33268V2.49935C9.16406 2.03911 9.53716 1.66602 9.99739 1.66602ZM15.89 4.10679C16.2154 4.43222 16.2154 4.95986 15.89 5.2853L15.3007 5.87455C14.9753 6.19999 14.4477 6.19999 14.1222 5.87455C13.7968 5.54912 13.7968 5.02148 14.1222 4.69604L14.7115 4.10679C15.0369 3.78135 15.5646 3.78135 15.89 4.10679ZM4.10483 4.10679C4.43027 3.78135 4.95791 3.78135 5.28334 4.10679L5.8726 4.69604C6.19804 5.02148 6.19804 5.54912 5.8726 5.87455C5.54716 6.19999 5.01953 6.19999 4.69409 5.87455L4.10483 5.2853C3.7794 4.95986 3.7794 4.43222 4.10483 4.10679ZM9.99739 6.66601C8.15645 6.66601 6.66406 8.1584 6.66406 9.99935C6.66406 11.8403 8.15645 13.3327 9.99739 13.3327C11.8383 13.3327 13.3307 11.8403 13.3307 9.99935C13.3307 8.1584 11.8383 6.66601 9.99739 6.66601ZM4.9974 9.99935C4.9974 7.23792 7.23597 4.99935 9.99739 4.99935C12.7588 4.99935 14.9974 7.23792 14.9974 9.99935C14.9974 12.7608 12.7588 14.9993 9.99739 14.9993C7.23597 14.9993 4.9974 12.7608 4.9974 9.99935ZM1.66406 9.99935C1.66406 9.53911 2.03716 9.16601 2.4974 9.16601H3.33073C3.79097 9.16601 4.16406 9.53911 4.16406 9.99935C4.16406 10.4596 3.79097 10.8327 3.33073 10.8327H2.4974C2.03716 10.8327 1.66406 10.4596 1.66406 9.99935ZM15.8307 9.99935C15.8307 9.53911 16.2038 9.16601 16.6641 9.16601H17.4974C17.9576 9.16601 18.3307 9.53911 18.3307 9.99935C18.3307 10.4596 17.9576 10.8327 17.4974 10.8327H16.6641C16.2038 10.8327 15.8307 10.4596 15.8307 9.99935ZM4.69409 14.1241C5.01953 13.7987 5.54716 13.7987 5.8726 14.1241C6.19804 14.4496 6.19804 14.9772 5.8726 15.3026L5.28334 15.8919C4.95791 16.2173 4.43027 16.2173 4.10483 15.8919C3.7794 15.5665 3.7794 15.0388 4.10483 14.7134L4.69409 14.1241ZM14.1222 15.3026C13.7968 14.9772 13.7968 14.4496 14.1222 14.1241C14.4477 13.7987 14.9753 13.7987 15.3007 14.1241L15.89 14.7134C16.2154 15.0388 16.2154 15.5665 15.89 15.8919C15.5646 16.2173 15.0369 16.2173 14.7115 15.8919L14.1222 15.3026ZM9.99739 15.8327C10.4576 15.8327 10.8307 16.2058 10.8307 16.666V17.4993C10.8307 17.9596 10.4576 18.3327 9.99739 18.3327C9.53716 18.3327 9.16406 17.9596 9.16406 17.4993V16.666C9.16406 16.2058 9.53716 15.8327 9.99739 15.8327Z"
                fill="currentColor"
              />
            </svg>
            <span
              className={`text-sm font-semibold ${
                !isDark ? "text-[#1C1D22]" : "text-[#1C1D22] opacity-50"
              }`}
              style={{
                fontFamily:
                  "Exo 2, -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "14px",
                fontWeight: "600",
                lineHeight: "100%",
              }}
            >
              Light
            </span>
          </button>

          {/* Dark Mode Button */}
          <button
            onClick={() => (!isDark ? toggleTheme() : undefined)}
            className={`flex-1 h-[34px] rounded-[18px] flex items-center justify-center px-4 transition-all duration-200 cursor-pointer ${
              isDark
                ? "bg-white shadow-[0px_8px_6px_0px_rgba(28,29,34,0.06)]"
                : "hover:bg-white/5"
            }`}
          >
            <svg
              className={`w-5 h-5 mr-2 ${isDark ? "text-[#1C1D22]" : "text-[#1C1D22] opacity-50"}`}
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                d="M7.80064 2.7441C8.05491 2.99837 8.11741 3.38706 7.95565 3.70821C7.5339 4.54559 7.29601 5.49197 7.29601 6.49632C7.29601 9.92474 10.0753 12.704 13.5037 12.704C14.508 12.704 15.4544 12.4661 16.2918 12.0444C16.613 11.8826 17.0017 11.9451 17.2559 12.1994C17.5102 12.4536 17.5727 12.8423 17.4109 13.1635C16.1163 15.7339 13.4524 17.5 10.3744 17.5C6.02547 17.5 2.5 13.9746 2.5 9.62567C2.5 6.54767 4.26617 3.88368 6.83653 2.58909C7.15769 2.42734 7.54638 2.48983 7.80064 2.7441ZM5.68475 5.55802C4.73864 6.64786 4.16667 8.07027 4.16667 9.62567C4.16667 13.0541 6.94594 15.8334 10.3744 15.8334C11.9298 15.8334 13.3522 15.2614 14.442 14.3153C14.1342 14.3519 13.8211 14.3707 13.5037 14.3707C9.15481 14.3707 5.62934 10.8452 5.62934 6.49632C5.62934 6.17895 5.64816 5.86581 5.68475 5.55802Z"
                fill="currentColor"
              />
            </svg>
            <span
              className={`text-sm font-semibold ${
                isDark ? "text-[#1C1D22]" : "text-[#1C1D22] opacity-50"
              }`}
              style={{
                fontFamily:
                  "Exo 2, -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "14px",
                fontWeight: "600",
                lineHeight: "100%",
              }}
            >
              Dark
            </span>
          </button>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={projectModal.isOpen}
        onClose={() =>
          setProjectModal({ isOpen: false, mode: "create", project: null })
        }
        project={projectModal.project}
        onSave={handleSaveProject}
        mode={projectModal.mode}
        screenSize={screenSize}
      />

      {/* Click outside handler for project menu */}
      {activeProjectMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setActiveProjectMenu(null)}
        />
      )}
    </div>
  );
};
