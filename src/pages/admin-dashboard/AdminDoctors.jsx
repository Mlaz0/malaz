import LoadingSpinner from "@/components/shared/LoadingSpinner";
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
  const { data: getAllDoctors } = useGetAllDoctors();
  const { data: getApprovedDoctors } = useGetApprovedDoctors();
  const { data: getPendingDoctors } = useGetPendingDoctors();
  const allDoctorsData = getAllDoctors?.data?.data;
  const approvedDoctorsData = getApprovedDoctors?.data?.data;
  const pendingDoctorsData = getPendingDoctors?.data?.data;
  const approvedDoctors = approvedDoctorsData?.doctors || [];

  const isLoading =
    !allDoctorsData || !approvedDoctorsData || !pendingDoctorsData;

  // Only include doctors with at least one rating
  const ratedDoctors = approvedDoctors.filter(
    (doc) => (doc.doctorData?.ratingCount || 0) > 0
  );

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
      badge: (
        <span className="badge">{pendingDoctorsData?.totalDoctors || 0}</span>
      ), // عدد الطلبات المعلقة
    },
  ];

  const averageRating =
    ratedDoctors.length > 0
      ? (
          ratedDoctors.reduce(
            (sum, doc) => sum + (doc.doctorData?.ratingNumber || 0),
            0
          ) / ratedDoctors.length
        ).toFixed(1)
      : "-";

  const handleTabChange = (path) => {
    navigate(path);
  };

  if (isLoading) return <LoadingSpinner />;

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
                {allDoctorsData?.totalDoctors || 0}
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
                {approvedDoctorsData?.totalDoctors || 0}
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
                {pendingDoctorsData?.totalDoctors || 0}
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
              <p className="text-2xl font-bold text-blue-600">
                {averageRating}
              </p>
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
