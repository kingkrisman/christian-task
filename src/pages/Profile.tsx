import React, { useState } from "react";
import { LeftSidebar } from "../components/LeftSidebar";
import { useTheme } from "../contexts/ThemeContext";
import { useTaskManager } from "../hooks/useTaskManager";
import {
  Edit,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  Star,
  Award,
  Activity,
  TrendingUp,
  Users,
  Target,
  Plus,
} from "lucide-react";

export default function Profile() {
  const { isDark } = useTheme();
  const { filteredTasks } = useTaskManager();
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data
  const user = {
    name: "Vincent Rodriguez",
    email: "vincent@taskflow.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "January 15, 2024",
    role: "Senior Product Designer",
    department: "Design Team",
    bio: "Passionate product designer with 5+ years of experience creating user-centered digital experiences. I love turning complex problems into simple, beautiful designs that users love to interact with.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face",
  };

  // Calculate user statistics
  const userTasks = filteredTasks.filter((task) =>
    task.assignees.some((assignee) => assignee.name === "Vincent"),
  );
  const completedTasks = userTasks.filter(
    (task) => task.status === "done",
  ).length;
  const inProgressTasks = userTasks.filter(
    (task) => task.status === "inprogress",
  ).length;
  const totalTasks = userTasks.length;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Recent activity data
  const recentActivity = [
    {
      id: 1,
      type: "task_completed",
      title: "Completed 'Design new ui presentation'",
      time: "2 hours ago",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      id: 2,
      type: "task_created",
      title: "Created 'Review brand guidelines'",
      time: "4 hours ago",
      icon: Plus,
      color: "text-blue-600",
    },
    {
      id: 3,
      type: "comment",
      title: "Commented on 'Mobile app wireframes'",
      time: "6 hours ago",
      icon: Activity,
      color: "text-purple-600",
    },
    {
      id: 4,
      type: "task_assigned",
      title: "Assigned to 'User research analysis'",
      time: "1 day ago",
      icon: Users,
      color: "text-orange-600",
    },
  ];

  // Skills and achievements
  const skills = [
    { name: "UI/UX Design", level: 95 },
    { name: "Prototyping", level: 90 },
    { name: "User Research", level: 85 },
    { name: "Design Systems", level: 88 },
    { name: "Collaboration", level: 92 },
  ];

  const achievements = [
    {
      title: "Task Master",
      description: "Completed 50+ tasks",
      icon: Target,
      earned: true,
    },
    {
      title: "Team Player",
      description: "Collaborated on 20+ projects",
      icon: Users,
      earned: true,
    },
    {
      title: "Rising Star",
      description: "Top performer this month",
      icon: Star,
      earned: true,
    },
    {
      title: "Efficiency Expert",
      description: "90%+ completion rate",
      icon: Award,
      earned: false,
    },
  ];

  return (
    <div
      className={`flex w-full min-h-screen ${isDark ? "bg-dark-primary" : "bg-white"}`}
    >
      <LeftSidebar screenSize="desktop" />

      <div className="flex-1 ml-[90px] p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1
                className={`text-3xl font-bold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
              >
                My Profile
              </h1>
              <p
                className={`text-sm ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"} mt-1`}
              >
                View and manage your profile information
              </p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-2 px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 transition-colors"
            >
              <Edit className="w-4 h-4" />
              <span>{isEditing ? "Save Changes" : "Edit Profile"}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-1">
            <div
              className={`rounded-xl border p-6 ${
                isDark
                  ? "bg-dark-card border-dark-border"
                  : "bg-white border-brand-gray-200"
              }`}
            >
              {/* Avatar and Basic Info */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  {isEditing && (
                    <button className="absolute bottom-4 right-0 w-8 h-8 bg-brand-blue text-white rounded-full flex items-center justify-center hover:bg-brand-blue/90 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <input
                    type="text"
                    defaultValue={user.name}
                    className={`text-xl font-bold text-center w-full border-none bg-transparent ${
                      isDark ? "text-dark-text" : "text-brand-dark"
                    }`}
                  />
                ) : (
                  <h2
                    className={`text-xl font-bold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                  >
                    {user.name}
                  </h2>
                )}

                <p
                  className={`${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                >
                  {user.role}
                </p>
                <p
                  className={`text-sm ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                >
                  {user.department}
                </p>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail
                    className={`w-5 h-5 ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                  />
                  {isEditing ? (
                    <input
                      type="email"
                      defaultValue={user.email}
                      className={`flex-1 bg-transparent border-none ${
                        isDark ? "text-dark-text" : "text-brand-dark"
                      }`}
                    />
                  ) : (
                    <span
                      className={`${isDark ? "text-dark-text" : "text-brand-dark"}`}
                    >
                      {user.email}
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  <Phone
                    className={`w-5 h-5 ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                  />
                  {isEditing ? (
                    <input
                      type="tel"
                      defaultValue={user.phone}
                      className={`flex-1 bg-transparent border-none ${
                        isDark ? "text-dark-text" : "text-brand-dark"
                      }`}
                    />
                  ) : (
                    <span
                      className={`${isDark ? "text-dark-text" : "text-brand-dark"}`}
                    >
                      {user.phone}
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin
                    className={`w-5 h-5 ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                  />
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={user.location}
                      className={`flex-1 bg-transparent border-none ${
                        isDark ? "text-dark-text" : "text-brand-dark"
                      }`}
                    />
                  ) : (
                    <span
                      className={`${isDark ? "text-dark-text" : "text-brand-dark"}`}
                    >
                      {user.location}
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar
                    className={`w-5 h-5 ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                  />
                  <span
                    className={`${isDark ? "text-dark-text" : "text-brand-dark"}`}
                  >
                    Joined {user.joinDate}
                  </span>
                </div>
              </div>

              {/* Bio */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3
                  className={`font-medium mb-3 ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                >
                  About
                </h3>
                {isEditing ? (
                  <textarea
                    rows={4}
                    defaultValue={user.bio}
                    className={`w-full bg-transparent border border-gray-200 rounded-lg p-3 resize-none ${
                      isDark
                        ? "text-dark-text border-dark-border"
                        : "text-brand-dark"
                    }`}
                  />
                ) : (
                  <p
                    className={`text-sm leading-relaxed ${
                      isDark ? "text-dark-text-secondary" : "text-brand-dark/60"
                    }`}
                  >
                    {user.bio}
                  </p>
                )}
              </div>
            </div>

            {/* Skills */}
            <div
              className={`mt-6 rounded-xl border p-6 ${
                isDark
                  ? "bg-dark-card border-dark-border"
                  : "bg-white border-brand-gray-200"
              }`}
            >
              <h3
                className={`font-semibold mb-4 ${isDark ? "text-dark-text" : "text-brand-dark"}`}
              >
                Skills
              </h3>
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span
                        className={`text-sm font-medium ${
                          isDark ? "text-dark-text" : "text-brand-dark"
                        }`}
                      >
                        {skill.name}
                      </span>
                      <span
                        className={`text-sm ${
                          isDark
                            ? "text-dark-text-secondary"
                            : "text-brand-dark/60"
                        }`}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div
                      className={`w-full bg-gray-200 rounded-full h-2 ${
                        isDark ? "bg-dark-border" : "bg-brand-gray-200"
                      }`}
                    >
                      <div
                        className="bg-brand-blue h-2 rounded-full transition-all"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                      Total Tasks
                    </p>
                    <p
                      className={`text-2xl font-bold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                    >
                      {totalTasks}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-blue-600" />
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
                      Completed
                    </p>
                    <p
                      className={`text-2xl font-bold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                    >
                      {completedTasks}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
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
                      In Progress
                    </p>
                    <p
                      className={`text-2xl font-bold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                    >
                      {inProgressTasks}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-orange-600" />
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
                      Success Rate
                    </p>
                    <p
                      className={`text-2xl font-bold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                    >
                      {completionRate}%
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div
              className={`rounded-xl border p-6 ${
                isDark
                  ? "bg-dark-card border-dark-border"
                  : "bg-white border-brand-gray-200"
              }`}
            >
              <h3
                className={`font-semibold mb-4 ${isDark ? "text-dark-text" : "text-brand-dark"}`}
              >
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-100`}
                      >
                        <Icon className={`w-4 h-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                        >
                          {activity.title}
                        </p>
                        <p
                          className={`text-xs ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                        >
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Achievements */}
            <div
              className={`rounded-xl border p-6 ${
                isDark
                  ? "bg-dark-card border-dark-border"
                  : "bg-white border-brand-gray-200"
              }`}
            >
              <h3
                className={`font-semibold mb-4 ${isDark ? "text-dark-text" : "text-brand-dark"}`}
              >
                Achievements
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div
                      key={achievement.title}
                      className={`p-4 rounded-lg border transition-colors ${
                        achievement.earned
                          ? isDark
                            ? "bg-dark-accent border-dark-border"
                            : "bg-brand-gray-50 border-brand-gray-200"
                          : isDark
                            ? "bg-dark-border/20 border-dark-border opacity-50"
                            : "bg-gray-50 border-gray-200 opacity-50"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            achievement.earned
                              ? "bg-brand-blue text-white"
                              : "bg-gray-300"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4
                            className={`font-medium ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                          >
                            {achievement.title}
                          </h4>
                          <p
                            className={`text-sm ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                          >
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
