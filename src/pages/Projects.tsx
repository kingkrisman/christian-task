import React, { useState } from "react";
import { LeftSidebar } from "../components/LeftSidebar";
import { useTheme } from "../contexts/ThemeContext";
import { useProjectManager } from "../hooks/useProjectManager";
import { ProjectModal } from "../components/ProjectModal";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Pause,
  Archive,
  Edit,
  Trash2,
  Copy,
} from "lucide-react";

export default function Projects() {
  const { isDark } = useTheme();
  const {
    projects,
    createProject,
    updateProject,
    deleteProject,
    duplicateProject,
  } = useProjectManager();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
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

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "on-hold":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "archived":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "on-hold":
        return <Pause className="w-4 h-4" />;
      case "archived":
        return <Archive className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

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
      className={`flex w-full min-h-screen ${isDark ? "bg-dark-primary" : "bg-white"}`}
    >
      <LeftSidebar screenSize="desktop" />

      <div className="flex-1 ml-[90px] p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1
                className={`text-3xl font-bold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
              >
                Projects
              </h1>
              <p
                className={`text-sm ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"} mt-1`}
              >
                Manage and organize your projects
              </p>
            </div>
            <button
              onClick={handleCreateProject}
              className="flex items-center space-x-2 px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>New Project</span>
            </button>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                    isDark ? "text-dark-text-secondary" : "text-brand-dark/40"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors ${
                    isDark
                      ? "bg-dark-accent border-dark-border text-dark-text placeholder-dark-text-secondary"
                      : "bg-white border-brand-gray-200 text-brand-dark placeholder-brand-dark/40"
                  }`}
                />
              </div>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  isDark
                    ? "bg-dark-accent border-dark-border text-dark-text"
                    : "bg-white border-brand-gray-200 text-brand-dark"
                }`}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div
              className={`flex rounded-lg border ${
                isDark ? "border-dark-border" : "border-brand-gray-200"
              }`}
            >
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-l-lg transition-colors ${
                  viewMode === "grid"
                    ? isDark
                      ? "bg-dark-accent text-dark-text"
                      : "bg-brand-gray-100 text-brand-dark"
                    : isDark
                      ? "text-dark-text-secondary hover:bg-dark-accent"
                      : "text-brand-dark/60 hover:bg-brand-gray-50"
                }`}
              >
                <div className="grid grid-cols-2 gap-1 w-4 h-4">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-r-lg transition-colors ${
                  viewMode === "list"
                    ? isDark
                      ? "bg-dark-accent text-dark-text"
                      : "bg-brand-gray-100 text-brand-dark"
                    : isDark
                      ? "text-dark-text-secondary hover:bg-dark-accent"
                      : "text-brand-dark/60 hover:bg-brand-gray-50"
                }`}
              >
                <div className="space-y-1 w-4 h-4">
                  <div className="h-1 bg-current rounded"></div>
                  <div className="h-1 bg-current rounded"></div>
                  <div className="h-1 bg-current rounded"></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Projects Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={`group relative rounded-xl border p-6 transition-all hover:shadow-lg ${
                  isDark
                    ? "bg-dark-card border-dark-border hover:border-dark-accent"
                    : "bg-white border-brand-gray-200 hover:border-brand-gray-300"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        project.status === "active"
                          ? "bg-green-100"
                          : project.status === "completed"
                            ? "bg-blue-100"
                            : project.status === "on-hold"
                              ? "bg-yellow-100"
                              : "bg-gray-100"
                      }`}
                    >
                      {getStatusIcon(project.status)}
                    </div>
                    <div>
                      <h3
                        className={`font-semibold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                      >
                        {project.name}
                      </h3>
                      <span
                        className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}
                      >
                        <span className="capitalize">
                          {project.status.replace("-", " ")}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="relative">
                    <button
                      onClick={() =>
                        setActiveProjectMenu(
                          activeProjectMenu === project.id ? null : project.id,
                        )
                      }
                      className={`opacity-0 group-hover:opacity-100 p-1 rounded transition-all ${
                        isDark
                          ? "hover:bg-dark-accent"
                          : "hover:bg-brand-gray-100"
                      }`}
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>

                    {activeProjectMenu === project.id && (
                      <div
                        className={`absolute right-0 top-full mt-1 w-48 border rounded-lg shadow-lg z-50 py-1 ${
                          isDark
                            ? "bg-dark-card border-dark-border"
                            : "bg-white border-brand-gray-200"
                        }`}
                      >
                        <button
                          onClick={() => handleEditProject(project)}
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
                          onClick={() => handleDuplicateProject(project.id)}
                          className={`w-full flex items-center space-x-2 px-3 py-2 text-sm transition-colors ${
                            isDark
                              ? "text-dark-text hover:bg-dark-accent"
                              : "text-brand-dark hover:bg-brand-gray-50"
                          }`}
                        >
                          <Copy className="w-3 h-3" />
                          <span>Duplicate</span>
                        </button>
                        <div
                          className={`border-t my-1 ${isDark ? "border-dark-border" : "border-brand-gray-100"}`}
                        />
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete Project</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                    >
                      Tasks
                    </span>
                    <span
                      className={`text-sm font-medium ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                    >
                      {project.count}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Calendar
                        className={`w-4 h-4 ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                      />
                      <span
                        className={`${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                      >
                        {project.createdAt
                          ? new Date(project.createdAt).toLocaleDateString()
                          : "Today"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users
                        className={`w-4 h-4 ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                      />
                      <span
                        className={`${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                      >
                        3 members
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // List View
          <div
            className={`rounded-xl border ${isDark ? "bg-dark-card border-dark-border" : "bg-white border-brand-gray-200"}`}
          >
            <div
              className={`grid grid-cols-12 gap-4 p-4 border-b font-medium text-sm ${
                isDark
                  ? "border-dark-border text-dark-text-secondary"
                  : "border-brand-gray-200 text-brand-dark/60"
              }`}
            >
              <div className="col-span-4">Project Name</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Tasks</div>
              <div className="col-span-2">Created</div>
              <div className="col-span-2">Actions</div>
            </div>

            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={`grid grid-cols-12 gap-4 p-4 border-b last:border-b-0 transition-colors ${
                  isDark
                    ? "border-dark-border hover:bg-dark-accent"
                    : "border-brand-gray-100 hover:bg-brand-gray-50"
                }`}
              >
                <div className="col-span-4 flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      project.status === "active"
                        ? "bg-green-100"
                        : project.status === "completed"
                          ? "bg-blue-100"
                          : project.status === "on-hold"
                            ? "bg-yellow-100"
                            : "bg-gray-100"
                    }`}
                  >
                    {getStatusIcon(project.status)}
                  </div>
                  <span
                    className={`font-medium ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                  >
                    {project.name}
                  </span>
                </div>

                <div className="col-span-2 flex items-center">
                  <span
                    className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}
                  >
                    <span className="capitalize">
                      {project.status.replace("-", " ")}
                    </span>
                  </span>
                </div>

                <div className="col-span-2 flex items-center">
                  <span
                    className={`${isDark ? "text-dark-text" : "text-brand-dark"}`}
                  >
                    {project.count}
                  </span>
                </div>

                <div className="col-span-2 flex items-center">
                  <span
                    className={`text-sm ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                  >
                    {project.createdAt
                      ? new Date(project.createdAt).toLocaleDateString()
                      : "Today"}
                  </span>
                </div>

                <div className="col-span-2 flex items-center relative">
                  <button
                    onClick={() =>
                      setActiveProjectMenu(
                        activeProjectMenu === project.id ? null : project.id,
                      )
                    }
                    className={`p-1 rounded transition-colors ${
                      isDark
                        ? "hover:bg-dark-border"
                        : "hover:bg-brand-gray-200"
                    }`}
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>

                  {activeProjectMenu === project.id && (
                    <div
                      className={`absolute left-0 top-full mt-1 w-48 border rounded-lg shadow-lg z-50 py-1 ${
                        isDark
                          ? "bg-dark-card border-dark-border"
                          : "bg-white border-brand-gray-200"
                      }`}
                    >
                      <button
                        onClick={() => handleEditProject(project)}
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
                        onClick={() => handleDuplicateProject(project.id)}
                        className={`w-full flex items-center space-x-2 px-3 py-2 text-sm transition-colors ${
                          isDark
                            ? "text-dark-text hover:bg-dark-accent"
                            : "text-brand-dark hover:bg-brand-gray-50"
                        }`}
                      >
                        <Copy className="w-3 h-3" />
                        <span>Duplicate</span>
                      </button>
                      <div
                        className={`border-t my-1 ${isDark ? "border-dark-border" : "border-brand-gray-100"}`}
                      />
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete Project</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                isDark ? "bg-dark-accent" : "bg-brand-gray-100"
              }`}
            >
              <Archive
                className={`w-8 h-8 ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
              />
            </div>
            <h3
              className={`text-lg font-medium mb-2 ${isDark ? "text-dark-text" : "text-brand-dark"}`}
            >
              No projects found
            </h3>
            <p
              className={`${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"} mb-4`}
            >
              {searchQuery
                ? "Try adjusting your search criteria"
                : "Get started by creating your first project"}
            </p>
            {!searchQuery && (
              <button
                onClick={handleCreateProject}
                className="px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 transition-colors"
              >
                Create Project
              </button>
            )}
          </div>
        )}
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
        screenSize="desktop"
      />

      {/* Click outside handler */}
      {activeProjectMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setActiveProjectMenu(null)}
        />
      )}
    </div>
  );
}
