import React, { useState } from "react";
import { LeftSidebar } from "../components/LeftSidebar";
import { useTheme } from "../contexts/ThemeContext";
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Mail,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";

export default function Settings() {
  const { isDark, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Profile settings
    name: "Vincent Rodriguez",
    email: "vincent@taskflow.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Senior Product Designer with 5+ years of experience in creating user-centered digital experiences.",

    // Notification settings
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    taskReminders: true,
    teamUpdates: false,

    // Privacy settings
    profileVisibility: "team",
    showEmail: false,
    showPhone: false,

    // Appearance settings
    language: "en",
    timezone: "PST",
    dateFormat: "MM/DD/YYYY",

    // Security settings
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorAuth: false,
  });

  const sections = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "security", label: "Security", icon: Shield },
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving settings:", formData);
  };

  return (
    <div
      className={`flex w-full min-h-screen ${isDark ? "bg-dark-primary" : "bg-white"}`}
    >
      <LeftSidebar screenSize="desktop" />

      <div className="flex-1 ml-[90px] p-8">
        {/* Header */}
        <div className="mb-8">
          <h1
            className={`text-3xl font-bold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
          >
            Settings
          </h1>
          <p
            className={`text-sm ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"} mt-1`}
          >
            Manage your account settings and preferences
          </p>
        </div>

        <div className="flex gap-8">
          {/* Settings Navigation */}
          <div
            className={`w-64 rounded-xl border p-4 h-fit ${
              isDark
                ? "bg-dark-card border-dark-border"
                : "bg-white border-brand-gray-200"
            }`}
          >
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? isDark
                          ? "bg-dark-accent text-dark-text"
                          : "bg-brand-blue text-white"
                        : isDark
                          ? "text-dark-text-secondary hover:bg-dark-accent hover:text-dark-text"
                          : "text-brand-dark/60 hover:bg-brand-gray-50 hover:text-brand-dark"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{section.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="flex-1">
            <div
              className={`rounded-xl border ${
                isDark
                  ? "bg-dark-card border-dark-border"
                  : "bg-white border-brand-gray-200"
              }`}
            >
              {/* Profile Settings */}
              {activeSection === "profile" && (
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2
                      className={`text-xl font-semibold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                    >
                      Profile Settings
                    </h2>
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Profile Picture */}
                    <div className="flex items-center space-x-6">
                      <div className="w-20 h-20 bg-brand-blue rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        VR
                      </div>
                      <div>
                        <button className="px-4 py-2 bg-brand-gray-100 text-brand-dark rounded-lg hover:bg-brand-gray-200 transition-colors">
                          Change Photo
                        </button>
                        <p
                          className={`text-sm mt-1 ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                        >
                          JPG, PNG or GIF. Max size 2MB
                        </p>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDark ? "text-dark-text" : "text-brand-dark"
                          }`}
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                            isDark
                              ? "bg-dark-accent border-dark-border text-dark-text"
                              : "bg-white border-brand-gray-200 text-brand-dark"
                          }`}
                        />
                      </div>

                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDark ? "text-dark-text" : "text-brand-dark"
                          }`}
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                            isDark
                              ? "bg-dark-accent border-dark-border text-dark-text"
                              : "bg-white border-brand-gray-200 text-brand-dark"
                          }`}
                        />
                      </div>

                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDark ? "text-dark-text" : "text-brand-dark"
                          }`}
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                            isDark
                              ? "bg-dark-accent border-dark-border text-dark-text"
                              : "bg-white border-brand-gray-200 text-brand-dark"
                          }`}
                        />
                      </div>

                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDark ? "text-dark-text" : "text-brand-dark"
                          }`}
                        >
                          Location
                        </label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) =>
                            handleInputChange("location", e.target.value)
                          }
                          className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                            isDark
                              ? "bg-dark-accent border-dark-border text-dark-text"
                              : "bg-white border-brand-gray-200 text-brand-dark"
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          isDark ? "text-dark-text" : "text-brand-dark"
                        }`}
                      >
                        Bio
                      </label>
                      <textarea
                        rows={4}
                        value={formData.bio}
                        onChange={(e) =>
                          handleInputChange("bio", e.target.value)
                        }
                        className={`w-full px-4 py-2 rounded-lg border transition-colors resize-none ${
                          isDark
                            ? "bg-dark-accent border-dark-border text-dark-text"
                            : "bg-white border-brand-gray-200 text-brand-dark"
                        }`}
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Settings */}
              {activeSection === "notifications" && (
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2
                      className={`text-xl font-semibold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                    >
                      Notification Preferences
                    </h2>
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        id: "emailNotifications",
                        label: "Email Notifications",
                        description: "Receive notifications via email",
                        icon: Mail,
                      },
                      {
                        id: "pushNotifications",
                        label: "Push Notifications",
                        description:
                          "Receive push notifications on your device",
                        icon: Smartphone,
                      },
                      {
                        id: "weeklyReports",
                        label: "Weekly Reports",
                        description: "Get weekly progress reports",
                        icon: Monitor,
                      },
                      {
                        id: "taskReminders",
                        label: "Task Reminders",
                        description: "Receive reminders for due tasks",
                        icon: Bell,
                      },
                      {
                        id: "teamUpdates",
                        label: "Team Updates",
                        description: "Get notified about team activity",
                        icon: User,
                      },
                    ].map((setting) => {
                      const Icon = setting.icon;
                      return (
                        <div
                          key={setting.id}
                          className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0"
                        >
                          <div className="flex items-center space-x-4">
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                isDark ? "bg-dark-accent" : "bg-brand-gray-100"
                              }`}
                            >
                              <Icon
                                className={`w-5 h-5 ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                              />
                            </div>
                            <div>
                              <h3
                                className={`font-medium ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                              >
                                {setting.label}
                              </h3>
                              <p
                                className={`text-sm ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                              >
                                {setting.description}
                              </p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={
                                formData[
                                  setting.id as keyof typeof formData
                                ] as boolean
                              }
                              onChange={(e) =>
                                handleInputChange(setting.id, e.target.checked)
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-blue"></div>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Appearance Settings */}
              {activeSection === "appearance" && (
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2
                      className={`text-xl font-semibold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                    >
                      Appearance Settings
                    </h2>
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Theme Toggle */}
                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            isDark ? "bg-dark-accent" : "bg-brand-gray-100"
                          }`}
                        >
                          {isDark ? (
                            <Moon
                              className={`w-5 h-5 ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                            />
                          ) : (
                            <Sun
                              className={`w-5 h-5 ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                            />
                          )}
                        </div>
                        <div>
                          <h3
                            className={`font-medium ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                          >
                            Theme Mode
                          </h3>
                          <p
                            className={`text-sm ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                          >
                            Choose between light and dark theme
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={toggleTheme}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          isDark
                            ? "border-dark-border text-dark-text hover:bg-dark-accent"
                            : "border-brand-gray-200 text-brand-dark hover:bg-brand-gray-50"
                        }`}
                      >
                        {isDark ? "Switch to Light" : "Switch to Dark"}
                      </button>
                    </div>

                    {/* Language */}
                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            isDark ? "bg-dark-accent" : "bg-brand-gray-100"
                          }`}
                        >
                          <Globe
                            className={`w-5 h-5 ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                          />
                        </div>
                        <div>
                          <h3
                            className={`font-medium ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                          >
                            Language
                          </h3>
                          <p
                            className={`text-sm ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                          >
                            Select your preferred language
                          </p>
                        </div>
                      </div>
                      <select
                        value={formData.language}
                        onChange={(e) =>
                          handleInputChange("language", e.target.value)
                        }
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          isDark
                            ? "bg-dark-accent border-dark-border text-dark-text"
                            : "bg-white border-brand-gray-200 text-brand-dark"
                        }`}
                      >
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                      </select>
                    </div>

                    {/* Timezone */}
                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                      <div>
                        <h3
                          className={`font-medium ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                        >
                          Timezone
                        </h3>
                        <p
                          className={`text-sm ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                        >
                          Your current timezone
                        </p>
                      </div>
                      <select
                        value={formData.timezone}
                        onChange={(e) =>
                          handleInputChange("timezone", e.target.value)
                        }
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          isDark
                            ? "bg-dark-accent border-dark-border text-dark-text"
                            : "bg-white border-brand-gray-200 text-brand-dark"
                        }`}
                      >
                        <option value="PST">Pacific Standard Time</option>
                        <option value="EST">Eastern Standard Time</option>
                        <option value="CST">Central Standard Time</option>
                        <option value="MST">Mountain Standard Time</option>
                      </select>
                    </div>

                    {/* Date Format */}
                    <div className="flex items-center justify-between py-4">
                      <div>
                        <h3
                          className={`font-medium ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                        >
                          Date Format
                        </h3>
                        <p
                          className={`text-sm ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                        >
                          How dates are displayed
                        </p>
                      </div>
                      <select
                        value={formData.dateFormat}
                        onChange={(e) =>
                          handleInputChange("dateFormat", e.target.value)
                        }
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          isDark
                            ? "bg-dark-accent border-dark-border text-dark-text"
                            : "bg-white border-brand-gray-200 text-brand-dark"
                        }`}
                      >
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeSection === "security" && (
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2
                      className={`text-xl font-semibold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                    >
                      Security Settings
                    </h2>
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Change Password */}
                    <div
                      className={`p-6 rounded-lg border ${
                        isDark
                          ? "border-dark-border bg-dark-accent"
                          : "border-brand-gray-200 bg-brand-gray-50"
                      }`}
                    >
                      <h3
                        className={`font-medium mb-4 ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                      >
                        Change Password
                      </h3>
                      <div className="space-y-4">
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Current password"
                            value={formData.currentPassword}
                            onChange={(e) =>
                              handleInputChange(
                                "currentPassword",
                                e.target.value,
                              )
                            }
                            className={`w-full px-4 py-2 pr-12 rounded-lg border transition-colors ${
                              isDark
                                ? "bg-dark-card border-dark-border text-dark-text"
                                : "bg-white border-brand-gray-200 text-brand-dark"
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                              isDark
                                ? "text-dark-text-secondary"
                                : "text-brand-dark/60"
                            }`}
                          >
                            {showPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <input
                          type="password"
                          placeholder="New password"
                          value={formData.newPassword}
                          onChange={(e) =>
                            handleInputChange("newPassword", e.target.value)
                          }
                          className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                            isDark
                              ? "bg-dark-card border-dark-border text-dark-text"
                              : "bg-white border-brand-gray-200 text-brand-dark"
                          }`}
                        />
                        <input
                          type="password"
                          placeholder="Confirm new password"
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            handleInputChange("confirmPassword", e.target.value)
                          }
                          className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                            isDark
                              ? "bg-dark-card border-dark-border text-dark-text"
                              : "bg-white border-brand-gray-200 text-brand-dark"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                      <div>
                        <h3
                          className={`font-medium ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                        >
                          Two-Factor Authentication
                        </h3>
                        <p
                          className={`text-sm ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                        >
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.twoFactorAuth}
                          onChange={(e) =>
                            handleInputChange("twoFactorAuth", e.target.checked)
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-blue"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Settings */}
              {activeSection === "privacy" && (
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2
                      className={`text-xl font-semibold ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                    >
                      Privacy Settings
                    </h2>
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Profile Visibility */}
                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                      <div>
                        <h3
                          className={`font-medium ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                        >
                          Profile Visibility
                        </h3>
                        <p
                          className={`text-sm ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                        >
                          Who can see your profile information
                        </p>
                      </div>
                      <select
                        value={formData.profileVisibility}
                        onChange={(e) =>
                          handleInputChange("profileVisibility", e.target.value)
                        }
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          isDark
                            ? "bg-dark-accent border-dark-border text-dark-text"
                            : "bg-white border-brand-gray-200 text-brand-dark"
                        }`}
                      >
                        <option value="public">Everyone</option>
                        <option value="team">Team Members Only</option>
                        <option value="private">Only Me</option>
                      </select>
                    </div>

                    {/* Show Email */}
                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                      <div>
                        <h3
                          className={`font-medium ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                        >
                          Show Email Address
                        </h3>
                        <p
                          className={`text-sm ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                        >
                          Allow others to see your email address
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.showEmail}
                          onChange={(e) =>
                            handleInputChange("showEmail", e.target.checked)
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-blue"></div>
                      </label>
                    </div>

                    {/* Show Phone */}
                    <div className="flex items-center justify-between py-4">
                      <div>
                        <h3
                          className={`font-medium ${isDark ? "text-dark-text" : "text-brand-dark"}`}
                        >
                          Show Phone Number
                        </h3>
                        <p
                          className={`text-sm ${isDark ? "text-dark-text-secondary" : "text-brand-dark/60"}`}
                        >
                          Allow others to see your phone number
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.showPhone}
                          onChange={(e) =>
                            handleInputChange("showPhone", e.target.checked)
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-blue"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
