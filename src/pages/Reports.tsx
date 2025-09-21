import React, { useState } from "react";
import { LeftSidebar } from "../components/LeftSidebar";
import { useTheme } from "../contexts/ThemeContext";
import { useTaskManager } from "../hooks/useTaskManager";
import { useProjectManager } from "../hooks/useProjectManager";
import {
  Calendar,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  Download,
  Filter,
} from "lucide-react";

export default function Reports() {
  const { isDark } = useTheme();
  const { filteredTasks, taskCounts } = useTaskManager();
  const { projects } = useProjectManager();

  const [dateRange, setDateRange] = useState("30");
  const [reportType, setReportType] = useState("overview");

  // Calculate analytics data
  const totalTasks = filteredTasks.length;
  const completedTasks = filteredTasks.filter(
    (task) => task.status === "done",
  ).length;
  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === "inprogress",
  ).length;
  const todoTasks = filteredTasks.filter(
    (task) => task.status === "todo",
  ).length;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Task priority distribution
  const highPriorityTasks = filteredTasks.filter(
    (task) => task.priority === "high",
  ).length;
  const mediumPriorityTasks = filteredTasks.filter(
    (task) => task.priority === "medium",
  ).length;
  const lowPriorityTasks = filteredTasks.filter(
    (task) => task.priority === "low",
  ).length;

  // Project statistics
  const activeProjects = projects.filter(
    (project) => project.status === "active",
  ).length;
  const completedProjects = projects.filter(
    (project) => project.status === "completed",
  ).length;
  const onHoldProjects = projects.filter(
    (project) => project.status === "on-hold",
  ).length;

  // Mock data for charts
  const weeklyProgress = [
    { week: "Week 1", completed: 12, created: 15 },
    { week: "Week 2", completed: 18, created: 20 },
    { week: "Week 3", completed: 15, created: 18 },
    { week: "Week 4", completed: 22, created: 25 },
  ];

  const teamProductivity = [
    { name: "Vincent", completed: 45, efficiency: 92 },
    { name: "Sarah", completed: 32, efficiency: 87 },
    { name: "John", completed: 28, efficiency: 78 },
    { name: "Emma", completed: 18, efficiency: 85 },
    { name: "Michael", completed: 22, efficiency: 89 },
  ];

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
                Reports & Analytics
              </h1>
              <p
                className={`text-sm ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"} mt-1`}
              >
                Track team performance and project insights
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  isDark
                    ? "bg-dark-accent border-dark-border text-dark-text"
                    : "bg-white border-brand-gray-200 text-brand-dark"
                }`}
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 3 months</option>
                <option value="365">Last year</option>
              </select>
              <button className="flex items-center space-x-2 px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Report Type Tabs */}
          <div
            className={`flex space-x-1 p-1 rounded-lg ${isDark ? "bg-dark-accent" : "bg-brand-gray-100"}`}
          >
            {[
              { id: "overview", label: "Overview" },
              { id: "tasks", label: "Tasks" },
              { id: "projects", label: "Projects" },
              { id: "team", label: "Team Performance" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setReportType(tab.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  reportType === tab.id
                    ? isDark
                      ? "bg-dark-card text-dark-text shadow-sm"
                      : "bg-white text-brand-dark shadow-sm"
                    : isDark
                      ? "text-dark-text-secondary hover:text-dark-text"
                      : "text-brand-dark/60 hover:text-brand-dark"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div
            className={`p-6 rounded-xl border ${
              isDark
                ? "bg-dark-card border-dark-border"
                : "bg-white border-brand-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-medium ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                >
                  Total Tasks
                </p>
                <p
                  className={`text-3xl font-bold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                >
                  {totalTasks}
                </p>
                <p className="text-sm text-green-600 mt-1">
                  +12% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div
            className={`p-6 rounded-xl border ${
              isDark
                ? "bg-dark-card border-dark-border"
                : "bg-white border-brand-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-medium ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                >
                  Completion Rate
                </p>
                <p
                  className={`text-3xl font-bold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                >
                  {completionRate}%
                </p>
                <p className="text-sm text-green-600 mt-1">
                  +5% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div
            className={`p-6 rounded-xl border ${
              isDark
                ? "bg-dark-card border-dark-border"
                : "bg-white border-brand-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-medium ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                >
                  Active Projects
                </p>
                <p
                  className={`text-3xl font-bold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                >
                  {activeProjects}
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  {projects.length} total projects
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div
            className={`p-6 rounded-xl border ${
              isDark
                ? "bg-dark-card border-dark-border"
                : "bg-white border-brand-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-medium ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                >
                  Avg. Response Time
                </p>
                <p
                  className={`text-3xl font-bold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                >
                  2.4h
                </p>
                <p className="text-sm text-orange-600 mt-1">
                  -30min from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Task Status Distribution */}
          <div
            className={`p-6 rounded-xl border ${
              isDark
                ? "bg-dark-card border-dark-border"
                : "bg-white border-brand-gray-200"
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3
                className={`text-lg font-semibold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
              >
                Task Status Distribution
              </h3>
              <PieChart
                className={`w-5 h-5 ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span
                    className={`${isDark ? "text-dark-text" : "text-brand-dark"}`}
                  >
                    Completed
                  </span>
                </div>
                <div className="text-right">
                  <span
                    className={`font-semibold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                  >
                    {completedTasks}
                  </span>
                  <p
                    className={`text-sm ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                  >
                    {totalTasks > 0
                      ? Math.round((completedTasks / totalTasks) * 100)
                      : 0}
                    %
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                  <span
                    className={`${isDark ? "text-dark-text" : "text-brand-dark"}`}
                  >
                    In Progress
                  </span>
                </div>
                <div className="text-right">
                  <span
                    className={`font-semibold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                  >
                    {inProgressTasks}
                  </span>
                  <p
                    className={`text-sm ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                  >
                    {totalTasks > 0
                      ? Math.round((inProgressTasks / totalTasks) * 100)
                      : 0}
                    %
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span
                    className={`${isDark ? "text-dark-text" : "text-brand-dark"}`}
                  >
                    To Do
                  </span>
                </div>
                <div className="text-right">
                  <span
                    className={`font-semibold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                  >
                    {todoTasks}
                  </span>
                  <p
                    className={`text-sm ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                  >
                    {totalTasks > 0
                      ? Math.round((todoTasks / totalTasks) * 100)
                      : 0}
                    %
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Priority Distribution */}
          <div
            className={`p-6 rounded-xl border ${
              isDark
                ? "bg-dark-card border-dark-border"
                : "bg-white border-brand-gray-200"
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3
                className={`text-lg font-semibold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
              >
                Priority Distribution
              </h3>
              <AlertCircle
                className={`w-5 h-5 ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span
                    className={`${isDark ? "text-dark-text" : "text-brand-dark"}`}
                  >
                    High Priority
                  </span>
                </div>
                <div className="text-right">
                  <span
                    className={`font-semibold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                  >
                    {highPriorityTasks}
                  </span>
                  <p
                    className={`text-sm ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                  >
                    {totalTasks > 0
                      ? Math.round((highPriorityTasks / totalTasks) * 100)
                      : 0}
                    %
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span
                    className={`${isDark ? "text-dark-text" : "text-brand-dark"}`}
                  >
                    Medium Priority
                  </span>
                </div>
                <div className="text-right">
                  <span
                    className={`font-semibold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                  >
                    {mediumPriorityTasks}
                  </span>
                  <p
                    className={`text-sm ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                  >
                    {totalTasks > 0
                      ? Math.round((mediumPriorityTasks / totalTasks) * 100)
                      : 0}
                    %
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span
                    className={`${isDark ? "text-dark-text" : "text-brand-dark"}`}
                  >
                    Low Priority
                  </span>
                </div>
                <div className="text-right">
                  <span
                    className={`font-semibold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                  >
                    {lowPriorityTasks}
                  </span>
                  <p
                    className={`text-sm ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                  >
                    {totalTasks > 0
                      ? Math.round((lowPriorityTasks / totalTasks) * 100)
                      : 0}
                    %
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Performance Table */}
        <div
          className={`rounded-xl border ${
            isDark
              ? "bg-dark-card border-dark-border"
              : "bg-white border-brand-gray-200"
          }`}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3
              className={`text-lg font-semibold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
            >
              Team Performance
            </h3>
            <Users
              className={`w-5 h-5 ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  className={`border-b ${isDark ? "border-dark-border" : "border-brand-gray-200"}`}
                >
                  <th
                    className={`text-left p-4 font-medium ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                  >
                    Team Member
                  </th>
                  <th
                    className={`text-left p-4 font-medium ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                  >
                    Tasks Completed
                  </th>
                  <th
                    className={`text-left p-4 font-medium ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                  >
                    Efficiency Rate
                  </th>
                  <th
                    className={`text-left p-4 font-medium ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                  >
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody>
                {teamProductivity.map((member, index) => (
                  <tr
                    key={member.name}
                    className={`border-b last:border-b-0 ${
                      isDark
                        ? "border-dark-border hover:bg-dark-accent"
                        : "border-brand-gray-100 hover:bg-brand-gray-50"
                    }`}
                  >
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                            isDark
                              ? "bg-dark-accent text-dark-text"
                              : "bg-brand-gray-200 text-brand-dark"
                          }`}
                        >
                          {member.name[0]}
                        </div>
                        <span
                          className={`font-medium ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                        >
                          {member.name}
                        </span>
                      </div>
                    </td>
                    <td
                      className={`p-4 ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                    >
                      {member.completed}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`${isDark ? "text-dark-text" : "text-brand-dark"}`}
                        >
                          {member.efficiency}%
                        </span>
                        <div
                          className={`w-20 h-2 rounded-full ${isDark ? "bg-dark-border" : "bg-brand-gray-200"}`}
                        >
                          <div
                            className="h-2 rounded-full bg-brand-blue"
                            style={{ width: `${member.efficiency}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-600">
                          +{Math.floor(Math.random() * 10)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
