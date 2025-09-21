import React, { useState } from "react";
import { X, Calendar, User, Flag, Paperclip } from "lucide-react";
import { Task, mockUsers } from "../lib/data";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task | null;
  onSave: (task: Partial<Task>) => void;
  mode: "create" | "edit";
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  task,
  onSave,
  mode,
}) => {
  const [formData, setFormData] = useState({
    title: task?.title || "",
    category: task?.category || "",
    priority: task?.priority || "medium",
    date:
      task?.date ||
      new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    assignees: task?.assignees || [],
    status: task?.status || "todo",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: task?.id || Date.now().toString(),
      progress: task?.progress || 0,
      totalTasks: task?.totalTasks || 10,
      completedTasks: task?.completedTasks || 0,
      comments: task?.comments || 0,
      attachments: task?.attachments || 0,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-card w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-brand-gray-200">
          <h2 className="text-xl font-bold text-brand-dark">
            {mode === "create" ? "Create New Task" : "Edit Task"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-brand-gray-50 flex items-center justify-center hover:bg-brand-gray-100 transition-colors"
          >
            <X className="w-4 h-4 text-brand-dark/50" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-brand-dark mb-2">
              Task Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg border border-brand-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-dark/20 font-medium"
              placeholder="Enter task title..."
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-brand-dark mb-2">
              Category
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg border border-brand-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-dark/20 font-medium"
              placeholder="e.g., Design system, Marketing..."
              required
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-semibold text-brand-dark mb-2">
              Priority
            </label>
            <select
              value={formData.priority}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  priority: e.target.value as Task["priority"],
                })
              }
              className="w-full px-4 py-3 rounded-lg border border-brand-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-dark/20 font-medium"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-brand-dark mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as Task["status"],
                })
              }
              className="w-full px-4 py-3 rounded-lg border border-brand-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-dark/20 font-medium"
            >
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          {/* Assignees */}
          <div>
            <label className="block text-sm font-semibold text-brand-dark mb-2">
              Assign to Team Members
            </label>
            <div className="flex flex-wrap gap-2">
              {mockUsers.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => {
                    const isSelected = formData.assignees.some(
                      (a) => a.id === user.id,
                    );
                    if (isSelected) {
                      setFormData({
                        ...formData,
                        assignees: formData.assignees.filter(
                          (a) => a.id !== user.id,
                        ),
                      });
                    } else {
                      setFormData({
                        ...formData,
                        assignees: [...formData.assignees, user],
                      });
                    }
                  }}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
                    formData.assignees.some((a) => a.id === user.id)
                      ? "border-brand-dark bg-brand-dark text-white"
                      : "border-brand-gray-200 bg-white text-brand-dark hover:bg-brand-gray-50"
                  }`}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm font-medium">{user.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-lg border border-brand-gray-200 text-brand-dark font-semibold hover:bg-brand-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-lg bg-brand-dark text-white font-semibold hover:bg-brand-dark/90 transition-colors"
            >
              {mode === "create" ? "Create Task" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
