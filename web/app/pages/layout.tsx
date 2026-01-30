import React from "react";
import SideNav from "../ui/layouts/SideNav";
import AppBar from "../ui/layouts/AppBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <SideNav />
      <div className="flex-1 flex flex-col">
        <AppBar />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
