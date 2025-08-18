import type React from "react";
import { Sidebar } from "./sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar (fixed) */}
      <div className="w-64 fixed top-0 left-0 h-screen bg-white shadow">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 overflow-auto p-6">
        {children}
      </div>
    </div>
  );
}
