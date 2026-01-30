import {
  BellIcon,
  CheckCircleIcon,
  HomeIcon,
  HomeModernIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
export default function AppBar() {
  return (
    <header className="h-16 bg-white shadow-md flex items-center justify-between px-6 z-10 border-b border-gray-100">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold">Task Management System</h1>
      </div>

      <div className="flex items-center gap-4">
        <BellIcon className="w-5 h-5 cursor-pointer" />
        <img
          src="/avatar.png"
          alt="User"
          className="w-8 h-8 rounded-full border"
        />
      </div>
    </header>
  );
}
