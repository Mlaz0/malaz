import { useGetAllPatients } from "@/hooks/Actions/patients/useCrudsPatients";
import AdminPatientsTable from "@/components/admin.components/AdminPatientsTable";
import AdminPagination from "@/components/admin.components/AdminPagination";
import { MousePointerSquareDashed, User, Users, X } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const AdminPatients = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data: allPatientDataRes } = useGetAllPatients(page, limit);
  const allPatientData = allPatientDataRes?.data?.data;
  const currentPage = allPatientData?.currentPage || 1;
  const totalPages = allPatientData?.totalPages || 1;
  const [currentPatient, setCurrentPatient] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    {
      id: "details",
      label: "تفاصيل المريض",
      path: "",
      icon: User,
      isActive:
        location.pathname.endsWith("patients") ||
        location.pathname.endsWith("patients/"),
    },
    // {
    //   id: "posts",
    //   label: "المنشورات",
    //   path: "posts",
    //   icon: MousePointerSquareDashed,
    //   isActive: location.pathname.endsWith("posts"),
    // },
  ];

  useEffect(() => {
    setPage(1);
  }, [page]);

  const handleToggleShowDetails = (patient) => {
    if (currentPatient && currentPatient._id === patient._id) {
      setCurrentPatient(null);
    } else {
      setCurrentPatient(patient);
    }
  };

  if (!allPatientData) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">إدارة المرضى</h1>
          <p className="text-muted-foreground mt-2">
            إدارة حسابات المرضى والبحث
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="card-modern rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                إجمالي المرضى
              </p>
              <p className="text-2xl font-bold gradient-text">
                {allPatientData?.totalPatients || 0}
              </p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {currentPatient && (
        <>
          {/* Tabs Navigation */}
          <div className="card-modern rounded-lg">
            <div className="border-b border-border">
              <nav className="flex items-center justify-between px-6">
                {/* Tabs */}
                <div className="flex space-x-8 space-x-reverse">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => navigate(tab.path)}
                      className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                        tab.isActive
                          ? "border-primary text-primary"
                          : "border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300"
                      }`}
                    >
                      <tab.icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  ))}
                </div>
                {/* X Button */}
                <button
                  onClick={() => setCurrentPatient(null)}
                  className="ml-4 p-2 rounded-lg hover:bg-red-100 transition-colors"
                  title="إغلاق التفاصيل"
                >
                  <X className="h-5 w-5 text-red-500" />
                </button>
              </nav>
            </div>
            <div className="p-6">
              <Outlet context={{ patient: currentPatient }} />
            </div>
          </div>
        </>
      )}
      <AdminPatientsTable
        toggleDetails={handleToggleShowDetails}
        patients={allPatientData?.patients || []}
        currentPatient={currentPatient}
      />
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-muted-foreground">
          عرض {allPatientData?.patients?.length || 0} من أصل{" "}
          {allPatientData?.totalPatients || 0} مريض
        </p>
        <AdminPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default AdminPatients;
