"use client";
import { useAuth } from "@/app/context/AuthContext";
import { TextSkeleton } from "../shared/skeletons";
export default function AppBar() {
  const { user, isLoading } = useAuth();
  return (
    <header className="h-16 bg-white shadow-md flex items-center justify-between px-6 z-10 border-b border-gray-100">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold">Task Management System</h1>
      </div>

      <div className="flex items-center gap-4">
        {isLoading ? (
          <TextSkeleton />
        ) : (
          user && (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Hi, {user.name || user.email.split("@")[0]}
              </span>
            </div>
          )
        )}
      </div>
    </header>
  );
}
