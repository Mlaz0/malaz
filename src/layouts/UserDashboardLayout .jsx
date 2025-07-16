import { SidebarProvider } from "@/components/ui/sidebar";

import UserDashboardHeader from "@/components/layout/dashboard/user-dashboard/UserDashboardHeader";
import UserDashboardSidebar from "@/components/layout/dashboard/user-dashboard/UserDashboardSidebar";
import { Outlet } from "react-router-dom";

export default function UserDashboardLayout() {
  return (
    <div className="flex relative h-screen w-full flex-col overflow-hidden bg-background text-right rtl">
      <SidebarProvider>
        <div className="flex flex-1 overflow-hidden">
          <UserDashboardSidebar />

          <div className="flex flex-1 flex-col overflow-hidden">
            <UserDashboardHeader />
            <main className="flex-1 overflow-auto p-4">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
