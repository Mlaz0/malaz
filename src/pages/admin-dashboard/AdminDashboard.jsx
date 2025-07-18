"use client";
import { SimpleChart } from "@/components/admin.components/AdminChart";
import { StatsCards } from "@/components/admin.components/adminStatsCards";
import { useGetUserProfile } from "@/hooks/Actions/users/useCurdsUsers";

// Main Admin Dashboard component
const AdminDashboard = () => {
  const { data: userData } = useGetUserProfile();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="">
        <h1 className="text-3xl font-bold gradient-text mb-2">
          مرحباً بعودتك، {userData?.name}! 👋
        </h1>
        <p className="text-muted-foreground">
          إليك ما يحدث في منصة الصحة النفسية اليوم.
        </p>
      </div>

      {/* Statistics Cards */}
      <StatsCards />

      {/* Charts and Activities */}
      <SimpleChart />
    </div>
  );
};

export default AdminDashboard;
