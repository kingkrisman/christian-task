import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigation } from "../hooks/useNavigation";

const DashboardIcon = ({
  active = false,
  isDark = false,
}: {
  active?: boolean;
  isDark?: boolean;
}) => (
  <svg
    className={`w-5 h-5 sm:w-6 sm:h-6 ${active ? (isDark ? "text-white" : "text-white") : isDark ? "text-white/50" : "text-white/50"}`}
    viewBox="0 0 22 22"
    fill="none"
  >
    <path
      d="M2.75 4.58333C2.75 3.57081 3.57081 2.75 4.58333 2.75H8.25C9.26252 2.75 10.0833 3.57081 10.0833 4.58333V8.25C10.0833 9.26252 9.26252 10.0833 8.25 10.0833H4.58333C3.57081 10.0833 2.75 9.26252 2.75 8.25V4.58333ZM8.25 4.58333H4.58333V8.25H8.25V4.58333ZM11.9167 4.58333C11.9167 3.57081 12.7375 2.75 13.75 2.75H17.4167C18.4292 2.75 19.25 3.57081 19.25 4.58333V8.25C19.25 9.26252 18.4292 10.0833 17.4167 10.0833H13.75C12.7375 10.0833 11.9167 9.26252 11.9167 8.25V4.58333ZM17.4167 4.58333H13.75V8.25H17.4167V4.58333ZM2.75 13.75C2.75 12.7375 3.57081 11.9167 4.58333 11.9167H8.25C9.26252 11.9167 10.0833 12.7375 10.0833 13.75V17.4167C10.0833 18.4292 9.26252 19.25 8.25 19.25H4.58333C3.57081 19.25 2.75 18.4292 2.75 17.4167V13.75ZM8.25 13.75H4.58333V17.4167H8.25V13.75ZM11.9167 13.75C11.9167 12.7375 12.7375 11.9167 13.75 11.9167H17.4167C18.4292 11.9167 19.25 12.7375 19.25 13.75V17.4167C19.25 18.4292 18.4292 19.25 17.4167 19.25H13.75C12.7375 19.25 11.9167 18.4292 11.9167 17.4167V13.75ZM17.4167 13.75H13.75V17.4167H17.4167V13.75Z"
      fill="currentColor"
    />
  </svg>
);

const UserIcon = ({
  active = false,
  isDark = false,
}: {
  active?: boolean;
  isDark?: boolean;
}) => (
  <svg
    className={`w-5 h-5 sm:w-6 sm:h-6 ${active ? (isDark ? "text-white" : "text-white") : isDark ? "text-white/50" : "text-white/50"}`}
    viewBox="0 0 22 22"
    fill="none"
  >
    <path
      d="M11 3.66732C8.97496 3.66732 7.33333 5.30894 7.33333 7.33398C7.33333 9.35903 8.97496 11.0007 11 11.0007C13.025 11.0007 14.6667 9.35903 14.6667 7.33398C14.6667 5.30894 13.025 3.66732 11 3.66732ZM5.5 7.33398C5.5 4.29642 7.96243 1.83398 11 1.83398C14.0376 1.83398 16.5 4.29642 16.5 7.33398C16.5 10.3715 14.0376 12.834 11 12.834C7.96243 12.834 5.5 10.3715 5.5 7.33398ZM7.33333 16.5007C5.81455 16.5007 4.58333 17.7319 4.58333 19.2506C4.58333 19.7569 4.17293 20.1673 3.66667 20.1673C3.16041 20.1673 2.75 19.7569 2.75 19.2506C2.75 16.7193 4.80203 14.6673 7.33333 14.6673H14.6667C17.198 14.6673 19.25 16.7193 19.25 19.2507C19.25 19.7569 18.8396 20.1673 18.3333 20.1673C17.8271 20.1673 17.4167 19.7569 17.4167 19.2507C17.4167 17.7319 16.1854 16.5007 14.6667 16.5007H7.33333Z"
      fill="currentColor"
    />
  </svg>
);

const CalendarIcon = ({
  active = false,
  isDark = false,
}: {
  active?: boolean;
  isDark?: boolean;
}) => (
  <svg
    className={`w-5 h-5 sm:w-6 sm:h-6 ${active ? (isDark ? "text-white" : "text-white") : isDark ? "text-white/50" : "text-white/50"}`}
    viewBox="0 0 22 22"
    fill="none"
  >
    <path
      d="M8.25 1.83398C8.75626 1.83398 9.16667 2.24439 9.16667 2.75065V3.66732H12.8333V2.75065C12.8333 2.24439 13.2437 1.83398 13.75 1.83398C14.2563 1.83398 14.6667 2.24439 14.6667 2.75065V3.66732H17.4167C18.4292 3.66732 19.25 4.48813 19.25 5.50065V17.4173C19.25 18.4298 18.4292 19.2507 17.4167 19.2507H4.58333C3.57081 19.2507 2.75 18.4298 2.75 17.4173V5.50065C2.75 4.48813 3.57081 3.66732 4.58333 3.66732H7.33333V2.75065C7.33333 2.24439 7.74374 1.83398 8.25 1.83398ZM7.33333 5.50065H4.58333V8.25065H17.4167V5.50065H14.6667V6.41732C14.6667 6.92358 14.2563 7.33398 13.75 7.33398C13.2437 7.33398 12.8333 6.92358 12.8333 6.41732V5.50065H9.16667V6.41732C9.16667 6.92358 8.75626 7.33398 8.25 7.33398C7.74374 7.33398 7.33333 6.92358 7.33333 6.41732V5.50065ZM17.4167 10.084H4.58333V17.4173H17.4167V10.084Z"
      fill="currentColor"
    />
  </svg>
);

const ChartIcon = ({
  active = false,
  isDark = false,
}: {
  active?: boolean;
  isDark?: boolean;
}) => (
  <svg
    className={`w-5 h-5 sm:w-6 sm:h-6 ${active ? (isDark ? "text-white" : "text-white") : isDark ? "text-white/50" : "text-white/50"}`}
    viewBox="0 0 22 22"
    fill="none"
  >
    <path
      d="M2.75 4.58333C2.75 3.57081 3.57081 2.75 4.58333 2.75H17.4167C18.4292 2.75 19.25 3.57081 19.25 4.58333V17.4167C19.25 18.4292 18.4292 19.25 17.4167 19.25H4.58333C3.57081 19.25 2.75 18.4292 2.75 17.4167V4.58333ZM17.4167 4.58333H4.58333V17.4167H17.4167V4.58333ZM11 6.41667C11.5063 6.41667 11.9167 6.82707 11.9167 7.33333V14.6667C11.9167 15.1729 11.5063 15.5833 11 15.5833C10.4937 15.5833 10.0833 15.1729 10.0833 14.6667V7.33333C10.0833 6.82707 10.4937 6.41667 11 6.41667ZM14.6667 8.25C15.1729 8.25 15.5833 8.66041 15.5833 9.16667V14.6667C15.5833 15.1729 15.1729 15.5833 14.6667 15.5833C14.1604 15.5833 13.75 15.1729 13.75 14.6667V9.16667C13.75 8.66041 14.1604 8.25 14.6667 8.25ZM7.33333 10.0833C7.83959 10.0833 8.25 10.4937 8.25 11V14.6667C8.25 15.1729 7.83959 15.5833 7.33333 15.5833C6.82707 15.5833 6.41667 15.1729 6.41667 14.6667V11C6.41667 10.4937 6.82707 10.0833 7.33333 10.0833Z"
      fill="currentColor"
    />
  </svg>
);

const CloudIcon = ({
  active = false,
  isDark = false,
}: {
  active?: boolean;
  isDark?: boolean;
}) => (
  <svg
    className={`w-5 h-5 sm:w-6 sm:h-6 ${active ? (isDark ? "text-white" : "text-white") : isDark ? "text-white/50" : "text-white/50"}`}
    viewBox="0 0 22 22"
    fill="none"
  >
    <path
      d="M10.0859 3.66732C8.06085 3.66732 6.41927 5.30893 6.41927 7.33398C6.41927 7.3637 6.4197 7.39474 6.42047 7.4277C6.43045 7.85398 6.14517 8.23084 5.7322 8.33697C4.54539 8.64193 3.66927 9.72017 3.66927 11.0007C3.66927 12.5194 4.90051 13.7507 6.41927 13.7507H7.33594C7.8422 13.7507 8.2526 14.1611 8.2526 14.6673C8.2526 15.1736 7.8422 15.584 7.33594 15.584H6.41927C3.888 15.584 1.83594 13.532 1.83594 11.0007C1.83594 9.10999 2.98012 7.4884 4.61275 6.7874C4.88711 4.00644 7.23278 1.83398 10.0859 1.83398C12.1242 1.83398 13.9019 2.94254 14.8517 4.58695C17.8049 4.68319 20.1693 7.10747 20.1693 10.084C20.1693 13.1215 17.7069 15.584 14.6693 15.584C14.163 15.584 13.7526 15.1736 13.7526 14.6673C13.7526 14.1611 14.163 13.7507 14.6693 13.7507C16.6944 13.7507 18.3359 12.109 18.3359 10.084C18.3359 8.05893 16.6944 6.41732 14.6693 6.41732C14.5678 6.41732 14.4676 6.42142 14.3685 6.42943C13.9771 6.4611 13.6091 6.24003 13.4532 5.87969C12.8894 4.57641 11.5928 3.66732 10.0859 3.66732ZM10.3544 8.51914C10.7124 8.16116 11.2928 8.16116 11.6508 8.51914L13.4841 10.3525C13.8421 10.7105 13.8421 11.2909 13.4841 11.6488C13.1261 12.0068 12.5457 12.0068 12.1878 11.6488L11.9193 11.3803V18.334C11.9193 18.8402 11.5089 19.2507 11.0026 19.2507C10.4963 19.2507 10.0859 18.8402 10.0859 18.334V11.3803L9.81745 11.6488C9.45947 12.0068 8.87907 12.0068 8.52109 11.6488C8.16311 11.2909 8.16311 10.7105 8.52109 10.3525L10.3544 8.51914Z"
      fill="currentColor"
    />
  </svg>
);

const MapIcon = ({
  active = false,
  isDark = false,
}: {
  active?: boolean;
  isDark?: boolean;
}) => (
  <svg
    className={`w-5 h-5 sm:w-6 sm:h-6 ${active ? (isDark ? "text-white" : "text-white") : isDark ? "text-white/50" : "text-white/50"}`}
    viewBox="0 0 22 22"
    fill="none"
  >
    <path
      d="M7.96273 2.79704C8.15089 2.73432 8.35432 2.73432 8.54248 2.79704L13.7526 4.53375L17.7562 3.19922C18.9433 2.80351 20.1693 3.68712 20.1693 4.93847V15.8393C20.1693 16.6284 19.6643 17.329 18.9157 17.5786L14.0425 19.203C13.8543 19.2657 13.6509 19.2657 13.4627 19.203L8.2526 17.4663L4.24902 18.8008C3.06188 19.1965 1.83594 18.3129 1.83594 17.0615V6.1607C1.83594 5.37157 2.34089 4.67099 3.08952 4.42144L7.96273 2.79704ZM9.16927 15.8393L12.8359 17.0615V6.1607L9.16927 4.93847V15.8393ZM7.33594 4.93847L3.66927 6.1607V17.0615L7.33594 15.8393V4.93847ZM14.6693 6.1607V17.0615L18.3359 15.8393V4.93847L14.6693 6.1607Z"
      fill="currentColor"
    />
  </svg>
);

const SettingsIcon = ({
  active = false,
  isDark = false,
}: {
  active?: boolean;
  isDark?: boolean;
}) => (
  <svg
    className={`w-5 h-5 sm:w-6 sm:h-6 ${active ? (isDark ? "text-white" : "text-white") : isDark ? "text-white/50" : "text-white/50"}`}
    viewBox="0 0 22 22"
    fill="none"
  >
    <path
      d="M8.2474 4.58333C7.74113 4.58333 7.33073 4.99374 7.33073 5.5C7.33073 6.00626 7.74113 6.41667 8.2474 6.41667C8.75366 6.41667 9.16406 6.00626 9.16406 5.5C9.16406 4.99374 8.75366 4.58333 8.2474 4.58333ZM5.65388 4.58333C6.03139 3.51524 7.05003 2.75 8.2474 2.75C9.44476 2.75 10.4634 3.51524 10.8409 4.58333H17.4141C17.9203 4.58333 18.3307 4.99374 18.3307 5.5C18.3307 6.00626 17.9203 6.41667 17.4141 6.41667H10.8409C10.4634 7.48476 9.44476 8.25 8.2474 8.25C7.05003 8.25 6.03139 7.48476 5.65388 6.41667H4.58073C4.07447 6.41667 3.66406 6.00626 3.66406 5.5C3.66406 4.99374 4.07447 4.58333 4.58073 4.58333H5.65388ZM13.7474 10.0833C13.2411 10.0833 12.8307 10.4937 12.8307 11C12.8307 11.5063 13.2411 11.9167 13.7474 11.9167C14.2537 11.9167 14.6641 11.5063 14.6641 11C14.6641 10.4937 14.2537 10.0833 13.7474 10.0833ZM11.1539 10.0833C11.5314 9.01524 12.55 8.25 13.7474 8.25C14.9448 8.25 15.9634 9.01524 16.3409 10.0833H17.4141C17.9203 10.0833 18.3307 10.4937 18.3307 11C18.3307 11.5063 17.9203 11.9167 17.4141 11.9167H16.3409C15.9634 12.9848 14.9448 13.75 13.7474 13.75C12.55 13.75 11.5314 12.9848 11.1539 11.9167H4.58073C4.07447 11.9167 3.66406 11.5063 3.66406 11C3.66406 10.4937 4.07447 10.0833 4.58073 10.0833H11.1539ZM8.2474 15.5833C7.74113 15.5833 7.33073 15.9937 7.33073 16.5C7.33073 17.0063 7.74113 17.4167 8.2474 17.4167C8.75366 17.4167 9.16406 17.0063 9.16406 16.5C9.16406 15.9937 8.75366 15.5833 8.2474 15.5833ZM5.65388 15.5833C6.03139 14.5152 7.05003 13.75 8.2474 13.75C9.44476 13.75 10.4634 14.5152 10.8409 15.5833H17.4141C17.9203 15.5833 18.3307 15.9937 18.3307 16.5C18.3307 17.0063 17.9203 17.4167 17.4141 17.4167H10.8409C10.4634 18.4848 9.44476 19.25 8.2474 19.25C7.05003 19.25 6.03139 18.4848 5.65388 17.4167H4.58073C4.07447 17.4167 3.66406 17.0063 3.66406 16.5C3.66406 15.9937 4.07447 15.5833 4.58073 15.5833H5.65388Z"
      fill="currentColor"
    />
  </svg>
);

// Navigation items moved to useNavigation hook

const IconComponent = ({
  icon,
  active = false,
  isDark = false,
}: {
  icon: string;
  active?: boolean;
  isDark?: boolean;
}) => {
  switch (icon) {
    case "dashboard":
      return <DashboardIcon active={active} isDark={isDark} />;
    case "user":
      return <UserIcon active={active} isDark={isDark} />;
    case "calendar":
      return <CalendarIcon active={active} isDark={isDark} />;
    case "chart":
      return <ChartIcon active={active} isDark={isDark} />;
    case "cloud":
      return <CloudIcon active={active} isDark={isDark} />;
    case "map":
      return <MapIcon active={active} isDark={isDark} />;
    case "settings":
      return <SettingsIcon active={active} isDark={isDark} />;
    default:
      return null;
  }
};

interface LeftSidebarProps {
  screenSize: "mobile" | "tablet" | "desktop";
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ screenSize }) => {
  const { isDark, toggleTheme } = useTheme();
  const { navigationItems, openGlobalSearch, handleNavigation } =
    useNavigation();

  return (
    <div
      className={`flex flex-col h-screen max-h-screen overflow-hidden fixed top-0 left-0 z-50 ${
        isDark ? "bg-brand-dark" : "bg-brand-dark"
      } ${
        screenSize === "mobile"
          ? "w-80 min-w-80"
          : screenSize === "tablet"
            ? "w-20 min-w-20"
            : "w-[90px] min-w-[90px]"
      }`}
    >
      {/* Mobile Header */}
      {screenSize === "mobile" && (
        <div className="px-6 py-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <svg width="32" height="36" viewBox="0 0 24 26" fill="none">
              <path
                d="M24 8.88887L14 4V5.46663L22.5 9.62219L14 13.7777V26L24 21.1111V8.88887Z"
                fill="white"
              />
              <path
                d="M0 17.1111L10 22V20.5334L1.49996 16.3778L10 12.2223V0L0 4.88888V17.1111Z"
                fill="white"
              />
            </svg>
            <div>
              <h1 className="text-xl font-bold text-white">TaskFlow</h1>
              <p className="text-sm text-white/60">Project Management</p>
            </div>
          </div>
        </div>
      )}

      {/* Top Indicators (Desktop/Tablet only) */}
      {screenSize !== "mobile" && (
        <div className="flex justify-center pt-6 pb-8">
          <div className="flex space-x-2">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
            <div className="w-1 h-1 bg-white/20 rounded-full"></div>
          </div>
        </div>
      )}

      {/* Logo (Desktop/Tablet only) */}
      {screenSize !== "mobile" && (
        <div className="flex justify-center mb-12">
          <svg width="24" height="26" viewBox="0 0 24 26" fill="none">
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
      )}

      {/* Navigation Icons */}
      <div
        className={`flex-1 flex flex-col ${
          screenSize === "mobile"
            ? "px-4 space-y-2"
            : "items-center space-y-6 sm:space-y-8"
        }`}
      >
        {navigationItems.map((item, index) => (
          <div
            key={item.id}
            onClick={item.onClick}
            className={`${
              screenSize === "mobile"
                ? "flex items-center space-x-4 px-4 py-3 rounded-xl cursor-pointer transition-colors hover:bg-white/10"
                : `w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                    item.active ? "bg-white/10" : "hover:bg-white/5"
                  }`
            } ${item.active && screenSize === "mobile" ? "bg-white/10" : ""} relative`}
          >
            <IconComponent
              icon={item.icon}
              active={item.active}
              isDark={isDark}
            />
            {item.badge && item.badge > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">
                  {item.badge > 9 ? "9+" : item.badge}
                </span>
              </div>
            )}
            {screenSize === "mobile" && (
              <div className="flex items-center justify-between flex-1">
                <span
                  className={`text-sm font-medium ${
                    item.active ? "text-white" : "text-white/70"
                  }`}
                >
                  {item.label}
                </span>
                {item.badge && item.badge > 0 && (
                  <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full font-bold">
                    {item.badge > 9 ? "9+" : item.badge}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile User Profile */}
      {screenSize === "mobile" && (
        <div className="px-6 py-4 border-t border-white/10">
          <div
            className="flex items-center space-x-3 mb-4 cursor-pointer hover:bg-white/5 rounded-lg p-2 -m-2 transition-colors"
            onClick={() => handleNavigation("/profile")}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">V</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Vincent</p>
              <p className="text-xs text-white/60">Admin</p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Profile Icon (Desktop/Tablet only) */}
      {screenSize !== "mobile" && (
        <div className="pb-12 sm:pb-14 flex justify-center">
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors hover:bg-white/5"
            onClick={() => handleNavigation("/profile")}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">V</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
