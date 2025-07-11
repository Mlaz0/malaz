import { SidebarProvider } from "@/components/ui/sidebar";

import DoctorDashboardHeader from "@/components/layout/dashboard/doctor-dashboard/DoctorDashboardHeader";
import DoctorDashboardSidebar from "@/components/layout/dashboard/doctor-dashboard/DoctorDashboardSidebar";
import { Outlet } from "react-router-dom";

export default function DoctorDashboardLayout() {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background text-right rtl">
      <SidebarProvider>
        <div className="flex flex-1 overflow-hidden">
          <DoctorDashboardSidebar />

          <div className="flex flex-1 flex-col overflow-hidden">
            <DoctorDashboardHeader />
            <main className="flex-1 overflow-auto p-4">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
