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
const OnHoldFlow = {
  value: "on_hold",
  label: "On hold",
};
const CanceledFlow = {
  value: "canceled",
  label: "Canceled",
};
const ActiveFlow = {
  value: "active",
  label: "Active",
};

export const StepperFlow = [
  {
    value: "planned",
    label: "Planned",
    start: true,
    end: false,
    change_to: [OnHoldFlow, CanceledFlow],
  },
  {
    value: "in_progress",
    label: "In progress",
    start: false,
    end: false,
    change_to: [OnHoldFlow, CanceledFlow],
  },
  {
    value: "in_testing",
    label: "In testing",
    start: false,
    end: false,
    change_to: [OnHoldFlow, CanceledFlow],
  },
  {
    value: "on_hold",
    label: "On hold",
    start: false,
    end: false,
    change_to: [ActiveFlow, CanceledFlow],
  },
  {
    value: "ready_to_release",
    label: "Releasing",
    start: false,
    end: false,
    change_to: null,
  },
  {
    value: "complete",
    label: "Complete",
    start: false,
    end: true,
    change_to: null,
  },
  {
    value: "canceled",
    label: "Canceled",
    start: false,
    end: true,
    change_to: null,
  },
];
