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
