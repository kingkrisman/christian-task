import React, { useState, useEffect } from "react";
import {
  X,
  Plus,
  Calendar,
  DollarSign,
  Users,
  Tag,
  AlertCircle,
  CheckCircle,
  Clock,
  Archive,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { ProjectDetails } from "../hooks/useProjectManager";
import { mockUsers } from "../lib/data";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: ProjectDetails | null;
  onSave: (projectData: Partial<ProjectDetails>) => void;
  mode: "create" | "edit";
  screenSize: "mobile" | "tablet" | "desktop";
}

const statusOptions = [
  {
    value: "active",
    label: "Active",
    icon: CheckCircle,
    color: "text-green-500",
  },
  {
    value: "completed",
    label: "Completed",
    icon: CheckCircle,
    color: "text-blue-500",
  },
  { value: "on-hold", label: "On Hold", icon: Clock, color: "text-yellow-500" },
  {
    value: "archived",
    label: "Archived",
    icon: Archive,
    color: "text-gray-500",
  },
];

const priorityOptions = [
  { value: "low", label: "Low", color: "bg-blue-100 text-blue-700" },
  { value: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-700" },
  { value: "high", label: "High", color: "bg-red-100 text-red-700" },
];

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  project,
  onSave,
  mode,
  screenSize,
}) => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState<Partial<ProjectDetails>>({
    name: "",
    description: "",
    status: "active",
    priority: "medium",
    progress: 0,
    team: [],
    tags: [],
    dueDate: "",
    budget: {
      allocated: 0,
      spent: 0,
      currency: "USD",
    },
  });
  const [newTag, setNewTag] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (project && mode === "edit") {
      setFormData(project);
    } else {
      setFormData({
        name: "",
        description: "",
        status: "active",
        priority: "medium",
        progress: 0,
        team: [],
        tags: [],
        dueDate: "",
        budget: {
          allocated: 0,
          spent: 0,
          currency: "USD",
        },
      });
    }
    setErrors({});
  }, [project, mode, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = "Project name is required";
    }

    if (!formData.description?.trim()) {
      newErrors.description = "Project description is required";
    }

    if (formData.budget && formData.budget.allocated < 0) {
      newErrors.budget = "Budget cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  const handleInputChange = (field: keyof ProjectDetails, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((tag) => tag !== tagToRemove) || [],
    }));
  };

  const toggleTeamMember = (userId: string) => {
    setFormData((prev) => ({
      ...prev,
      team: prev.team?.includes(userId)
        ? prev.team.filter((id) => id !== userId)
        : [...(prev.team || []), userId],
    }));
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border shadow-2xl ${
            isDark
              ? "bg-dark-card border-dark-border"
              : "bg-white border-brand-gray-200"
          }`}
        >
          {/* Header */}
          <div
            className={`sticky top-0 px-6 py-4 border-b ${
              isDark
                ? "bg-dark-card border-dark-border"
                : "bg-white border-brand-gray-100"
            }`}
          >
            <div className="flex items-center justify-between">
              <h2
                className={`text-xl font-bold ${
                  isDark ? "text-dark-text" : "text-brand-dark"
                }`}
              >
                {mode === "create" ? "Create New Project" : "Edit Project"}
              </h2>
              <button
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${
                  isDark
                    ? "hover:bg-dark-accent text-dark-text-secondary"
                    : "hover:bg-brand-gray-100 text-brand-dark/60"
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-dark-text" : "text-brand-dark"
                  }`}
                >
                  Project Name *
                </label>
                <input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg transition-colors ${
                    errors.name
                      ? "border-red-300 focus:border-red-500"
                      : isDark
                        ? "bg-dark-accent border-dark-border text-dark-text focus:border-dark-text"
                        : "bg-white border-brand-gray-300 text-brand-dark focus:border-brand-dark"
                  }`}
                  placeholder="Enter project name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-dark-text" : "text-brand-dark"
                  }`}
                >
                  Description *
                </label>
                <textarea
                  value={formData.description || ""}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-lg transition-colors ${
                    errors.description
                      ? "border-red-300 focus:border-red-500"
                      : isDark
                        ? "bg-dark-accent border-dark-border text-dark-text focus:border-dark-text"
                        : "bg-white border-brand-gray-300 text-brand-dark focus:border-brand-dark"
                  }`}
                  placeholder="Enter project description"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description}
                  </p>
                )}
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-dark-text" : "text-brand-dark"
                  }`}
                >
                  Status
                </label>
                <select
                  value={formData.status || "active"}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg transition-colors ${
                    isDark
                      ? "bg-dark-accent border-dark-border text-dark-text"
                      : "bg-white border-brand-gray-300 text-brand-dark"
                  }`}
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-dark-text" : "text-brand-dark"
                  }`}
                >
                  Priority
                </label>
                <select
                  value={formData.priority || "medium"}
                  onChange={(e) =>
                    handleInputChange("priority", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg transition-colors ${
                    isDark
                      ? "bg-dark-accent border-dark-border text-dark-text"
                      : "bg-white border-brand-gray-300 text-brand-dark"
                  }`}
                >
                  {priorityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-dark-text" : "text-brand-dark"
                  }`}
                >
                  Progress (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.progress || 0}
                  onChange={(e) =>
                    handleInputChange("progress", parseInt(e.target.value) || 0)
                  }
                  className={`w-full px-3 py-2 border rounded-lg transition-colors ${
                    isDark
                      ? "bg-dark-accent border-dark-border text-dark-text"
                      : "bg-white border-brand-gray-300 text-brand-dark"
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-dark-text" : "text-brand-dark"
                  }`}
                >
                  Due Date
                </label>
                <input
                  type="date"
                  value={formData.dueDate || ""}
                  onChange={(e) => handleInputChange("dueDate", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg transition-colors ${
                    isDark
                      ? "bg-dark-accent border-dark-border text-dark-text"
                      : "bg-white border-brand-gray-300 text-brand-dark"
                  }`}
                />
              </div>
            </div>

            {/* Budget */}
            <div>
              <h3
                className={`text-lg font-semibold mb-3 ${
                  isDark ? "text-dark-text" : "text-brand-dark"
                }`}
              >
                Budget
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? "text-dark-text" : "text-brand-dark"
                    }`}
                  >
                    Allocated
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.budget?.allocated || 0}
                    onChange={(e) =>
                      handleInputChange("budget", {
                        ...formData.budget,
                        allocated: parseFloat(e.target.value) || 0,
                      })
                    }
                    className={`w-full px-3 py-2 border rounded-lg transition-colors ${
                      isDark
                        ? "bg-dark-accent border-dark-border text-dark-text"
                        : "bg-white border-brand-gray-300 text-brand-dark"
                    }`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? "text-dark-text" : "text-brand-dark"
                    }`}
                  >
                    Spent
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.budget?.spent || 0}
                    onChange={(e) =>
                      handleInputChange("budget", {
                        ...formData.budget,
                        spent: parseFloat(e.target.value) || 0,
                      })
                    }
                    className={`w-full px-3 py-2 border rounded-lg transition-colors ${
                      isDark
                        ? "bg-dark-accent border-dark-border text-dark-text"
                        : "bg-white border-brand-gray-300 text-brand-dark"
                    }`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? "text-dark-text" : "text-brand-dark"
                    }`}
                  >
                    Currency
                  </label>
                  <select
                    value={formData.budget?.currency || "USD"}
                    onChange={(e) =>
                      handleInputChange("budget", {
                        ...formData.budget,
                        currency: e.target.value,
                      })
                    }
                    className={`w-full px-3 py-2 border rounded-lg transition-colors ${
                      isDark
                        ? "bg-dark-accent border-dark-border text-dark-text"
                        : "bg-white border-brand-gray-300 text-brand-dark"
                    }`}
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">JPY</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Team Members */}
            <div>
              <h3
                className={`text-lg font-semibold mb-3 ${
                  isDark ? "text-dark-text" : "text-brand-dark"
                }`}
              >
                Team Members
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {mockUsers.map((user) => (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => toggleTeamMember(user.id)}
                    className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors ${
                      formData.team?.includes(user.id)
                        ? "border-blue-500 bg-blue-50"
                        : isDark
                          ? "border-dark-border bg-dark-accent hover:bg-dark-border"
                          : "border-brand-gray-300 bg-white hover:bg-brand-gray-50"
                    }`}
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span
                      className={`text-sm font-medium ${
                        isDark ? "text-dark-text" : "text-brand-dark"
                      }`}
                    >
                      {user.name}
                    </span>
                    {formData.team?.includes(user.id) && (
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3
                className={`text-lg font-semibold mb-3 ${
                  isDark ? "text-dark-text" : "text-brand-dark"
                }`}
              >
                Tags
              </h3>
              <div className="flex items-center space-x-2 mb-3">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addTag())
                  }
                  placeholder="Add a tag"
                  className={`flex-1 px-3 py-2 border rounded-lg transition-colors ${
                    isDark
                      ? "bg-dark-accent border-dark-border text-dark-text"
                      : "bg-white border-brand-gray-300 text-brand-dark"
                  }`}
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-blue-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-brand-gray-200">
              <button
                type="button"
                onClick={onClose}
                className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                  isDark
                    ? "border-dark-border text-dark-text hover:bg-dark-accent"
                    : "border-brand-gray-300 text-brand-dark hover:bg-brand-gray-50"
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-brand-dark text-white rounded-lg font-medium hover:bg-brand-dark/90 transition-colors"
              >
                {mode === "create" ? "Create Project" : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
