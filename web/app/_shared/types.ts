import {
  ArrowRightOnRectangleIcon,
  CheckCircleIcon,
  ClipboardDocumentListIcon,
  FolderIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export const links = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "My Tasks", href: "/tasks/my-tasks", icon: CheckCircleIcon },
  { name: "Projects", href: "/projects", icon: FolderIcon },
  { name: "Tasks", href: "/tasks", icon: ClipboardDocumentListIcon },
  { name: "Users", href: "/users", icon: UserGroupIcon },
  { name: "Logout", href: "logout", icon: ArrowRightOnRectangleIcon },
];

export interface UserType {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive?: boolean;
  createdAt?: string;
}

export interface ProjectType {
  id: string;
  name: string;
  description: string;
  createdAt?: string;
}

export type ProjectStatus =
  | "Planned"
  | "In progress"
  | "In testing"
  | "On hold"
  | "Ready to release"
  | "Complete"
  | "Canceled";

export const STATUS_FLOW = [
  "Planned",
  "In progress",
  "In testing",
  "On hold",
  "Ready to release",
  "Complete",
  "Canceled",
];

export const STATUS_TRANSITIONS: Record<ProjectStatus, ProjectStatus[]> = {
  Planned: ["Canceled"],
  "In progress": ["On hold", "Canceled"],
  "In testing": ["On hold", "Canceled"],
  "On hold": ["In progress", "In testing", "Canceled"],
  "Ready to release": ["Complete", "In testing", "Canceled"],
  Complete: [], // Final state
  Canceled: [], // Final state
};
