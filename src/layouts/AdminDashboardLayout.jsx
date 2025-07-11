import { SidebarProvider } from "@/components/ui/sidebar";

import AdminDashboardHeader from "@/components/layout/dashboard/admin-dashboard/AdminDashboardHeader";
import AdminDashboardSidebar from "@/components/layout/dashboard/admin-dashboard/AdminDashboardSidebar";
import { Outlet } from "react-router-dom";

export default function AdminDashboardLayout() {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background text-right rtl">
      <SidebarProvider>
        <div className="flex flex-1 overflow-hidden">
          <AdminDashboardSidebar />

          <div className="flex flex-1 flex-col overflow-hidden">
            <AdminDashboardHeader />
            <main className="flex-1 overflow-auto p-4">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
