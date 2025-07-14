import {
  useGetAllDoctors,
  useGetApprovedDoctors,
  useGetPendingDoctors,
} from "@/hooks/Actions/doctors/useCrudsDoctors";
import {
  CheckCircle,
  Clock,
  Star,
  Stethoscope,
  UserCheck,
  Users,
} from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const AdminDoctorDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: allDoctorsData } = useGetAllDoctors();
  const allDoctors = allDoctorsData?.doctors || [];
  const { data: approvedDoctorsData } = useGetApprovedDoctors();
  const approvedDoctors = approvedDoctorsData?.doctors || [];
  const { data: pendingDoctorsData } = useGetPendingDoctors();
  const pendingDoctors = pendingDoctorsData?.doctors || [];

  const tabs = [
    {
      id: "details",
      label: "تفاصيل الأطباء",
      path: "",
      icon: Users,
      isActive:
        location.pathname.endsWith("/admin-dashboard") ||
        location.pathname.endsWith("/admin-dashboard/doctors"),
    },
    {
      id: "pending",
      label: "طلبات الموافقة",
      path: "approvals",
      icon: UserCheck,
      isActive: location.pathname.endsWith("approvals"),
      badge: <span className="badge">{pendingDoctors.length}</span>, // عدد الطلبات المعلقة
    },
  ];

  const handleTabChange = (path) => {
    navigate(path);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">إدارة الأطباء</h1>
          <p className="text-muted-foreground mt-2">
            إدارة حسابات الأطباء ومراجعة طلبات الموافقة الجديدة
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="card-modern rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                إجمالي الأطباء
              </p>
              <p className="text-2xl font-bold gradient-text">
                {allDoctors.length}
              </p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card-modern rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                الأطباء النشطون
              </p>
              <p className="text-2xl font-bold text-green-600">
                {approvedDoctors.length}
              </p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card-modern rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                طلبات معلقة
              </p>
              <p className="text-2xl font-bold text-yellow-600">
                {pendingDoctors.length}
              </p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-yellow-100 flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="card-modern rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                متوسط التقييم
              </p>
              <p className="text-2xl font-bold text-blue-600">4.8</p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Star className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="card-modern rounded-lg">
        <div className="border-b border-border">
          <nav className="flex space-x-8 space-x-reverse px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.path)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  tab.isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
                {tab.badge && (
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDoctorDetails;
