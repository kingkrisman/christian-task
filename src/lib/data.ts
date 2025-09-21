export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Task {
  id: string;
  title: string;
  category: string;
  progress: number;
  totalTasks: number;
  completedTasks: number;
  date: string;
  comments: number;
  attachments: number;
  assignees: User[];
  status: "todo" | "inprogress" | "done";
  priority: "low" | "medium" | "high";
}

export interface Project {
  id: string;
  name: string;
  count: number;
  active?: boolean;
}

// Mock users
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Vincent",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
  },
  {
    id: "2",
    name: "Sarah",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612cad5?w=32&h=32&fit=crop&crop=face",
  },
  {
    id: "3",
    name: "John",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
  },
  {
    id: "4",
    name: "Emma",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
  },
];

// Mock tasks data matching the design
export const mockTasks: Task[] = [
  // To Do column
  {
    id: "1",
    title: "Design new ui presentation",
    category: "Dribbble marketing",
    progress: 70,
    totalTasks: 10,
    completedTasks: 7,
    date: "24 Dec 2024",
    comments: 7,
    attachments: 2,
    assignees: [mockUsers[0], mockUsers[1]],
    status: "todo",
    priority: "medium",
  },
  {
    id: "2",
    title: "Add more ui/ux mockups",
    category: "Pinterest promotion",
    progress: 40,
    totalTasks: 10,
    completedTasks: 4,
    date: "25 Dec 2024",
    comments: 0,
    attachments: 0,
    assignees: [mockUsers[0], mockUsers[1], mockUsers[2]],
    status: "todo",
    priority: "medium",
  },
  {
    id: "3",
    title: "Design few mobile screens",
    category: "Dropbox mobile app",
    progress: 30,
    totalTasks: 10,
    completedTasks: 3,
    date: "26 Dec 2024",
    comments: 6,
    attachments: 4,
    assignees: [mockUsers[1]],
    status: "todo",
    priority: "high",
  },
  {
    id: "4",
    title: "Create a tweet and promote",
    category: "Twitter marketing",
    progress: 20,
    totalTasks: 14,
    completedTasks: 2,
    date: "27 Dec 2024",
    comments: 0,
    attachments: 0,
    assignees: [mockUsers[0], mockUsers[1], mockUsers[2]],
    status: "todo",
    priority: "high",
  },

  // In Progress column
  {
    id: "5",
    title: "Design system update",
    category: "Oreo website project",
    progress: 30,
    totalTasks: 10,
    completedTasks: 3,
    date: "20 Dec 2024",
    comments: 0,
    attachments: 0,
    assignees: [mockUsers[0], mockUsers[1], mockUsers[2]],
    status: "inprogress",
    priority: "medium",
  },
  {
    id: "6",
    title: "Create brand guideline",
    category: "Oreo branding project",
    progress: 70,
    totalTasks: 10,
    completedTasks: 7,
    date: "21 Dec 2024",
    comments: 2,
    attachments: 13,
    assignees: [mockUsers[1], mockUsers[2]],
    status: "inprogress",
    priority: "medium",
  },
  {
    id: "7",
    title: "Create wireframe for ios app",
    category: "Oreo ios app project",
    progress: 40,
    totalTasks: 10,
    completedTasks: 4,
    date: "22 Dec 2024",
    comments: 0,
    attachments: 0,
    assignees: [mockUsers[0], mockUsers[1], mockUsers[2]],
    status: "inprogress",
    priority: "high",
  },
  {
    id: "8",
    title: "Create ui kit for layout",
    category: "Crypto mobile app",
    progress: 30,
    totalTasks: 10,
    completedTasks: 3,
    date: "23 Dec 2024",
    comments: 23,
    attachments: 12,
    assignees: [mockUsers[2]],
    status: "inprogress",
    priority: "high",
  },

  // Done column
  {
    id: "9",
    title: "Add product to the market",
    category: "Ui8 marketplace",
    progress: 100,
    totalTasks: 10,
    completedTasks: 10,
    date: "15 Dec 2024",
    comments: 1,
    attachments: 5,
    assignees: [mockUsers[0], mockUsers[1], mockUsers[2]],
    status: "done",
    priority: "low",
  },
  {
    id: "10",
    title: "Launch product promotion",
    category: "Kickstarter campaign",
    progress: 100,
    totalTasks: 10,
    completedTasks: 10,
    date: "16 Dec 2024",
    comments: 17,
    attachments: 3,
    assignees: [mockUsers[1], mockUsers[2]],
    status: "done",
    priority: "low",
  },
  {
    id: "11",
    title: "Make twitter banner",
    category: "Twitter marketing",
    progress: 100,
    totalTasks: 10,
    completedTasks: 10,
    date: "17 Dec 2024",
    comments: 0,
    attachments: 0,
    assignees: [mockUsers[0], mockUsers[1]],
    status: "done",
    priority: "low",
  },
];

// Mock projects data
export const mockProjects: Project[] = [
  { id: "1", name: "All projects", count: 3 },
  { id: "2", name: "Design system", count: 0, active: true },
  { id: "3", name: "User flow", count: 0 },
  { id: "4", name: "Ux research", count: 0 },
];

// Mock task counts by status
export const taskCounts = {
  all: 11,
  todo: 4,
  inprogress: 4,
  done: 3,
};
