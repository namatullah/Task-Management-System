import {
  ArrowRightOnRectangleIcon,
  CheckCircleIcon,
  ClipboardDocumentListIcon,
  FolderIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export const links = [
  { name: "Dashboard", href: "/pages/dashboard", icon: HomeIcon },
  { name: "My Tasks", href: "/pages/tasks/my-tasks", icon: CheckCircleIcon },
  { name: "Projects", href: "/pages/projects", icon: FolderIcon },
  { name: "Tasks", href: "/pages/tasks", icon: ClipboardDocumentListIcon },
  { name: "Users", href: "/pages/users", icon: UserGroupIcon },
  { name: "Logout", href: "logout", icon: ArrowRightOnRectangleIcon },
];

