import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/dashboard/Sidebar";
import { TopNav } from "../../components/dashboard/TopNav";

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-950 dark">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <TopNav setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1">
          <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
