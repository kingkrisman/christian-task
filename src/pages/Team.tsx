import React, { useState } from "react";
import { LeftSidebar } from "../components/LeftSidebar";
import { useTheme } from "../contexts/ThemeContext";
import { mockUsers } from "../lib/data";
import {
  Plus,
  Search,
  Mail,
  Phone,
  Calendar,
  MapPin,
  MoreHorizontal,
  Edit,
  Trash2,
  UserPlus,
  Star,
  Crown,
  Shield,
  User,
  Activity,
  Clock,
  CheckCircle,
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "admin" | "manager" | "member";
  department: string;
  joinDate: string;
  lastActive: string;
  tasksCompleted: number;
  tasksInProgress: number;
  location: string;
  phone?: string;
  status: "active" | "away" | "offline";
}

const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Vincent Rodriguez",
    email: "vincent@taskflow.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    role: "admin",
    department: "Engineering",
    joinDate: "2024-01-15",
    lastActive: "2 minutes ago",
    tasksCompleted: 45,
    tasksInProgress: 8,
    location: "San Francisco, CA",
    phone: "+1 (555) 123-4567",
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@taskflow.com",
    avatar:
      "https://images.pexels.com/photos/3894379/pexels-photo-3894379.jpeg?w=64&h=64&fit=crop&crop=face",
    role: "manager",
    department: "Design",
    joinDate: "2024-02-20",
    lastActive: "1 hour ago",
    tasksCompleted: 32,
    tasksInProgress: 5,
    location: "New York, NY",
    phone: "+1 (555) 987-6543",
    status: "active",
  },
  {
    id: "3",
    name: "John Smith",
    email: "john@taskflow.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    role: "member",
    department: "Marketing",
    joinDate: "2024-03-10",
    lastActive: "3 hours ago",
    tasksCompleted: 28,
    tasksInProgress: 12,
    location: "Austin, TX",
    status: "away",
  },
  {
    id: "4",
    name: "Emma Davis",
    email: "emma@taskflow.com",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
    role: "member",
    department: "Engineering",
    joinDate: "2024-04-05",
    lastActive: "1 day ago",
    tasksCompleted: 18,
    tasksInProgress: 6,
    location: "Seattle, WA",
    status: "offline",
  },
  {
    id: "5",
    name: "Michael Chen",
    email: "michael@taskflow.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    role: "member",
    department: "Design",
    joinDate: "2024-05-12",
    lastActive: "30 minutes ago",
    tasksCompleted: 22,
    tasksInProgress: 9,
    location: "Los Angeles, CA",
    status: "active",
  },
];

export default function Team() {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const filteredMembers = mockTeamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment =
      departmentFilter === "all" || member.department === departmentFilter;
    const matchesRole = roleFilter === "all" || member.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || member.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesRole && matchesStatus;
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="w-4 h-4" />;
      case "manager":
        return <Shield className="w-4 h-4" />;
      case "member":
        return <User className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "text-purple-600 bg-purple-100 border-purple-200";
      case "manager":
        return "text-blue-600 bg-blue-100 border-blue-200";
      case "member":
        return "text-green-600 bg-green-100 border-green-200";
      default:
        return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const departments = [...new Set(mockTeamMembers.map((m) => m.department))];

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
                Team Members
              </h1>
              <p
                className={`text-sm ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"} mt-1`}
              >
                Manage your team members and their roles
              </p>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 transition-colors">
              <UserPlus className="w-4 h-4" />
              <span>Invite Member</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div
              className={`p-4 rounded-xl border ${
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
                    Total Members
                  </p>
                  <p
                    className={`text-2xl font-bold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                  >
                    {mockTeamMembers.length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border ${
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
                    Active Now
                  </p>
                  <p
                    className={`text-2xl font-bold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                  >
                    {
                      mockTeamMembers.filter((m) => m.status === "active")
                        .length
                    }
                  </p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border ${
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
                    Departments
                  </p>
                  <p
                    className={`text-2xl font-bold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                  >
                    {departments.length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border ${
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
                    Tasks Done
                  </p>
                  <p
                    className={`text-2xl font-bold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                  >
                    {mockTeamMembers.reduce(
                      (sum, m) => sum + m.tasksCompleted,
                      0,
                    )}
                  </p>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
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
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors ${
                    isDark
                      ? "bg-dark-accent border-dark-border text-dark-text placeholder-dark-text-secondary"
                      : "bg-white border-brand-gray-200 text-brand-dark placeholder-brand-dark/40"
                  }`}
                />
              </div>

              {/* Department Filter */}
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  isDark
                    ? "bg-dark-accent border-dark-border text-dark-text"
                    : "bg-white border-brand-gray-200 text-brand-dark"
                }`}
              >
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>

              {/* Role Filter */}
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  isDark
                    ? "bg-dark-accent border-dark-border text-dark-text"
                    : "bg-white border-brand-gray-200 text-brand-dark"
                }`}
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="member">Member</option>
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  isDark
                    ? "bg-dark-accent border-dark-border text-dark-text"
                    : "bg-white border-brand-gray-200 text-brand-dark"
                }`}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="away">Away</option>
                <option value="offline">Offline</option>
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

        {/* Members Display */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className={`group relative rounded-xl border p-6 transition-all hover:shadow-lg ${
                  isDark
                    ? "bg-dark-card border-dark-border hover:border-dark-accent"
                    : "bg-white border-brand-gray-200 hover:border-brand-gray-300"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(member.status)}`}
                      ></div>
                    </div>
                    <div>
                      <h3
                        className={`font-semibold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                      >
                        {member.name}
                      </h3>
                      <p
                        className={`text-sm ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                      >
                        {member.email}
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <button
                      onClick={() =>
                        setActiveMenu(
                          activeMenu === member.id ? null : member.id,
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

                    {activeMenu === member.id && (
                      <div
                        className={`absolute right-0 top-full mt-1 w-48 border rounded-lg shadow-lg z-50 py-1 ${
                          isDark
                            ? "bg-dark-card border-dark-border"
                            : "bg-white border-brand-gray-200"
                        }`}
                      >
                        <button
                          className={`w-full flex items-center space-x-2 px-3 py-2 text-sm transition-colors ${
                            isDark
                              ? "text-dark-text hover:bg-dark-accent"
                              : "text-brand-dark hover:bg-brand-gray-50"
                          }`}
                        >
                          <Edit className="w-3 h-3" />
                          <span>Edit Member</span>
                        </button>
                        <button
                          className={`w-full flex items-center space-x-2 px-3 py-2 text-sm transition-colors ${
                            isDark
                              ? "text-dark-text hover:bg-dark-accent"
                              : "text-brand-dark hover:bg-brand-gray-50"
                          }`}
                        >
                          <Mail className="w-3 h-3" />
                          <span>Send Message</span>
                        </button>
                        <div
                          className={`border-t my-1 ${isDark ? "border-dark-border" : "border-brand-gray-100"}`}
                        />
                        <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                          <Trash2 className="w-3 h-3" />
                          <span>Remove Member</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(member.role)}`}
                    >
                      {getRoleIcon(member.role)}
                      <span className="capitalize">{member.role}</span>
                    </span>
                    <span
                      className={`text-sm ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                    >
                      {member.department}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p
                        className={`${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                      >
                        Completed
                      </p>
                      <p
                        className={`font-semibold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                      >
                        {member.tasksCompleted}
                      </p>
                    </div>
                    <div>
                      <p
                        className={`${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                      >
                        In Progress
                      </p>
                      <p
                        className={`font-semibold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                      >
                        {member.tasksInProgress}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin
                        className={`w-4 h-4 ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                      />
                      <span
                        className={`${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                      >
                        {member.location}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm mt-1">
                      <Clock
                        className={`w-4 h-4 ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                      />
                      <span
                        className={`${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                      >
                        Last active {member.lastActive}
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
              <div className="col-span-3">Member</div>
              <div className="col-span-2">Role</div>
              <div className="col-span-2">Department</div>
              <div className="col-span-2">Tasks</div>
              <div className="col-span-2">Last Active</div>
              <div className="col-span-1">Actions</div>
            </div>

            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className={`grid grid-cols-12 gap-4 p-4 border-b last:border-b-0 transition-colors ${
                  isDark
                    ? "border-dark-border hover:bg-dark-accent"
                    : "border-brand-gray-100 hover:bg-brand-gray-50"
                }`}
              >
                <div className="col-span-3 flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div
                      className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(member.status)}`}
                    ></div>
                  </div>
                  <div>
                    <h3
                      className={`font-medium ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                    >
                      {member.name}
                    </h3>
                    <p
                      className={`text-sm ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                    >
                      {member.email}
                    </p>
                  </div>
                </div>

                <div className="col-span-2 flex items-center">
                  <span
                    className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(member.role)}`}
                  >
                    {getRoleIcon(member.role)}
                    <span className="capitalize">{member.role}</span>
                  </span>
                </div>

                <div className="col-span-2 flex items-center">
                  <span
                    className={`${isDark ? "text-dark-text" : "text-brand-dark"}`}
                  >
                    {member.department}
                  </span>
                </div>

                <div className="col-span-2 flex items-center">
                  <div className="text-sm">
                    <span
                      className={`font-semibold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                    >
                      {member.tasksCompleted}
                    </span>
                    <span
                      className={`${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                    >
                      {" "}
                      done, {member.tasksInProgress} active
                    </span>
                  </div>
                </div>

                <div className="col-span-2 flex items-center">
                  <span
                    className={`text-sm ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                  >
                    {member.lastActive}
                  </span>
                </div>

                <div className="col-span-1 flex items-center relative">
                  <button
                    onClick={() =>
                      setActiveMenu(activeMenu === member.id ? null : member.id)
                    }
                    className={`p-1 rounded transition-colors ${
                      isDark
                        ? "hover:bg-dark-border"
                        : "hover:bg-brand-gray-200"
                    }`}
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>

                  {activeMenu === member.id && (
                    <div
                      className={`absolute left-0 top-full mt-1 w-48 border rounded-lg shadow-lg z-50 py-1 ${
                        isDark
                          ? "bg-dark-card border-dark-border"
                          : "bg-white border-brand-gray-200"
                      }`}
                    >
                      <button
                        className={`w-full flex items-center space-x-2 px-3 py-2 text-sm transition-colors ${
                          isDark
                            ? "text-dark-text hover:bg-dark-accent"
                            : "text-brand-dark hover:bg-brand-gray-50"
                        }`}
                      >
                        <Edit className="w-3 h-3" />
                        <span>Edit Member</span>
                      </button>
                      <button
                        className={`w-full flex items-center space-x-2 px-3 py-2 text-sm transition-colors ${
                          isDark
                            ? "text-dark-text hover:bg-dark-accent"
                            : "text-brand-dark hover:bg-brand-gray-50"
                        }`}
                      >
                        <Mail className="w-3 h-3" />
                        <span>Send Message</span>
                      </button>
                      <div
                        className={`border-t my-1 ${isDark ? "border-dark-border" : "border-brand-gray-100"}`}
                      />
                      <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                        <Trash2 className="w-3 h-3" />
                        <span>Remove Member</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                isDark ? "bg-dark-accent" : "bg-brand-gray-100"
              }`}
            >
              <User
                className={`w-8 h-8 ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
              />
            </div>
            <h3
              className={`text-lg font-medium mb-2 ${isDark ? "text-dark-text" : "text-brand-dark"}`}
            >
              No team members found
            </h3>
            <p
              className={`${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"} mb-4`}
            >
              {searchQuery
                ? "Try adjusting your search criteria"
                : "Get started by inviting your first team member"}
            </p>
            {!searchQuery && (
              <button className="px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 transition-colors">
                Invite Member
              </button>
            )}
          </div>
        )}
      </div>

      {/* Click outside handler */}
      {activeMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setActiveMenu(null)}
        />
      )}
    </div>
  );
}
