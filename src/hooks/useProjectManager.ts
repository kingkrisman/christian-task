import { useState, useCallback, useMemo } from "react";
import { mockProjects, Project } from "../lib/data";

export interface ProjectDetails extends Project {
  description: string;
  createdAt: string;
  updatedAt: string;
  status: "active" | "completed" | "on-hold" | "archived";
  priority: "low" | "medium" | "high";
  progress: number;
  team: string[];
  dueDate?: string;
  tags: string[];
  budget?: {
    allocated: number;
    spent: number;
    currency: string;
  };
}

const extendedProjects: ProjectDetails[] = mockProjects.map((project) => ({
  ...project,
  description: `Description for ${project.name}`,
  createdAt: "2024-01-15",
  updatedAt: "2024-01-20",
  status: "active" as const,
  priority: "medium" as const,
  progress: Math.floor(Math.random() * 100),
  team: ["1", "2", "3"],
  tags: ["design", "development"],
  budget: {
    allocated: 50000,
    spent: 25000,
    currency: "USD",
  },
}));

export const useProjectManager = () => {
  const [projects, setProjects] = useState<ProjectDetails[]>(extendedProjects);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<string[]>([]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    let result = projects;

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (project) =>
          project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Apply status filter
    if (statusFilter.length > 0) {
      result = result.filter((project) =>
        statusFilter.includes(project.status),
      );
    }

    // Apply priority filter
    if (priorityFilter.length > 0) {
      result = result.filter((project) =>
        priorityFilter.includes(project.priority),
      );
    }

    return result;
  }, [projects, searchQuery, statusFilter, priorityFilter]);

  // Project statistics
  const projectStats = useMemo(() => {
    return {
      total: projects.length,
      active: projects.filter((p) => p.status === "active").length,
      completed: projects.filter((p) => p.status === "completed").length,
      onHold: projects.filter((p) => p.status === "on-hold").length,
      archived: projects.filter((p) => p.status === "archived").length,
      highPriority: projects.filter((p) => p.priority === "high").length,
      averageProgress:
        projects.reduce((sum, p) => sum + p.progress, 0) / projects.length,
    };
  }, [projects]);

  // CRUD operations
  const createProject = useCallback(
    (projectData: Omit<ProjectDetails, "id">) => {
      const newProject: ProjectDetails = {
        ...projectData,
        id: Date.now().toString(),
      };
      setProjects((prev) => [newProject, ...prev]);
      return newProject;
    },
    [],
  );

  const updateProject = useCallback(
    (projectId: string, updates: Partial<ProjectDetails>) => {
      setProjects((prev) =>
        prev.map((project) =>
          project.id === projectId
            ? { ...project, ...updates, updatedAt: new Date().toISOString() }
            : project,
        ),
      );
    },
    [],
  );

  const deleteProject = useCallback(
    (projectId: string) => {
      setProjects((prev) => prev.filter((project) => project.id !== projectId));
      if (selectedProject === projectId) {
        setSelectedProject(null);
      }
    },
    [selectedProject],
  );

  const duplicateProject = useCallback(
    (projectId: string) => {
      const projectToDuplicate = projects.find((p) => p.id === projectId);
      if (projectToDuplicate) {
        const duplicatedProject: ProjectDetails = {
          ...projectToDuplicate,
          id: Date.now().toString(),
          name: `${projectToDuplicate.name} (Copy)`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          progress: 0,
          status: "active",
        };
        setProjects((prev) => [duplicatedProject, ...prev]);
        return duplicatedProject;
      }
    },
    [projects],
  );

  const archiveProject = useCallback(
    (projectId: string) => {
      updateProject(projectId, { status: "archived" });
    },
    [updateProject],
  );

  const restoreProject = useCallback(
    (projectId: string) => {
      updateProject(projectId, { status: "active" });
    },
    [updateProject],
  );

  // Bulk operations
  const bulkUpdateStatus = useCallback(
    (projectIds: string[], status: ProjectDetails["status"]) => {
      setProjects((prev) =>
        prev.map((project) =>
          projectIds.includes(project.id)
            ? { ...project, status, updatedAt: new Date().toISOString() }
            : project,
        ),
      );
    },
    [],
  );

  const bulkDelete = useCallback(
    (projectIds: string[]) => {
      setProjects((prev) =>
        prev.filter((project) => !projectIds.includes(project.id)),
      );
      if (selectedProject && projectIds.includes(selectedProject)) {
        setSelectedProject(null);
      }
    },
    [selectedProject],
  );

  // Project selection
  const selectProject = useCallback((projectId: string | null) => {
    setSelectedProject(projectId);
  }, []);

  const getProject = useCallback(
    (projectId: string) => {
      return projects.find((project) => project.id === projectId);
    },
    [projects],
  );

  // Project team management
  const addTeamMember = useCallback(
    (projectId: string, userId: string) => {
      const project = getProject(projectId);
      if (project && !project.team.includes(userId)) {
        updateProject(projectId, {
          team: [...project.team, userId],
        });
      }
    },
    [getProject, updateProject],
  );

  const removeTeamMember = useCallback(
    (projectId: string, userId: string) => {
      const project = getProject(projectId);
      if (project) {
        updateProject(projectId, {
          team: project.team.filter((id) => id !== userId),
        });
      }
    },
    [getProject, updateProject],
  );

  // Tag management
  const addTag = useCallback(
    (projectId: string, tag: string) => {
      const project = getProject(projectId);
      if (project && !project.tags.includes(tag)) {
        updateProject(projectId, {
          tags: [...project.tags, tag],
        });
      }
    },
    [getProject, updateProject],
  );

  const removeTag = useCallback(
    (projectId: string, tag: string) => {
      const project = getProject(projectId);
      if (project) {
        updateProject(projectId, {
          tags: project.tags.filter((t) => t !== tag),
        });
      }
    },
    [getProject, updateProject],
  );

  // Budget management
  const updateBudget = useCallback(
    (projectId: string, budget: ProjectDetails["budget"]) => {
      updateProject(projectId, { budget });
    },
    [updateProject],
  );

  return {
    // Data
    projects: filteredProjects,
    allProjects: projects,
    selectedProject,
    projectStats,

    // Filters
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,

    // CRUD operations
    createProject,
    updateProject,
    deleteProject,
    duplicateProject,
    archiveProject,
    restoreProject,

    // Bulk operations
    bulkUpdateStatus,
    bulkDelete,

    // Selection
    selectProject,
    getProject,

    // Team management
    addTeamMember,
    removeTeamMember,

    // Tag management
    addTag,
    removeTag,

    // Budget management
    updateBudget,
  };
};
