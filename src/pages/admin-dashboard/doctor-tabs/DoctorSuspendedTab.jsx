import {
  useDoctorPendingAction,
  useGetSuspendedDoctors,
  useGetApprovedDoctors,
} from "@/hooks/Actions/doctors/useCrudsDoctors";
import {
  CheckCircle,
  Eye,
  Mail,
  MapPin,
  Phone,
  Search,
  Star,
  RotateCcw,
} from "lucide-react";
import DoctorDetailsModal from "@/components/admin.components/DoctorDetailsModal";
import AdminPagination from "@/components/admin.components/AdminPagination";
import { useState } from "react";
import React from "react";
import { Button } from "@/components/ui/button";

const DoctorSuspendedTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDetails, setShowDetails] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data: getSuspendedDoctors, refetch } = useGetSuspendedDoctors(
    page,
    limit
  );
  const suspendedDoctorsData = getSuspendedDoctors?.data?.data;
  const doctors = suspendedDoctorsData?.doctors || [];
  const currentPage = suspendedDoctorsData?.currentPage || 1;
  const totalPages = suspendedDoctorsData?.totalPages || 1;
  const { refetch: refetchApprovedDoctors } = useGetApprovedDoctors();
  const { mutate: mutatePendingAction } = useDoctorPendingAction();

  // Filter only on frontend for current page's doctors
  const filteredDoctors = doctors.filter((doctor) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      doctor.name?.toLowerCase().includes(search) ||
      doctor.email?.toLowerCase().includes(search) ||
      doctor.doctorData?.specializations?.some((s) =>
        s.name?.toLowerCase().includes(search)
      ) ||
      doctor.phone?.startsWith(search);
    return matchesSearch;
  });

  const handleReactivate = (doctor) => {
    mutatePendingAction(
      {
        data: {
          _id: doctor._id,
          doctorData: { currentStatus: "approved", isApproved: true },
        },
        id: doctor._id,
      },
      {
        onSuccess: () => {
          refetch(); // Force refetch after mutation
          refetchApprovedDoctors();
        },
      }
    );
  };

  // Reset to page 1 if search changes
  React.useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="البحث عن طبيب..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Doctors Table */}
      <div className="card-modern rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                  الطبيب
                </th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                  التخصص
                </th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                  الخبرة
                </th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                  التقييم
                </th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredDoctors.map((doctor) => (
                <tr
                  key={doctor._id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                        <img
                          className="aspect-square h-full w-full"
                          src={doctor.userImg?.url || "/placeholder.svg"}
                          alt={doctor.name}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{doctor.name}</p>
                          {doctor.doctorData?.currentStatus === "suspended" && (
                            <div className="flex items-center gap-1 text-red-600">
                              <span className="text-xs bg-red-100 px-2 py-1 rounded-full">
                                معلق
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {doctor.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {doctor.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium">
                      {doctor.doctorData?.specializations?.length
                        ? doctor.doctorData.specializations
                            .map((s) => s.name)
                            .join(", ")
                        : "-"}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {doctor.doctorData?.clinicLocation || "-"}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium">
                      {doctor.doctorData?.yearsOfExperience ?? "-"}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium">
                        {doctor.doctorData?.ratingNumber !== undefined
                          ? doctor.doctorData.ratingNumber.toFixed(1)
                          : "-"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({doctor.doctorData?.ratingCount ?? 0})
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setShowDetails(doctor._id)}
                      >
                        <Eye className="h-4 w-4" />
                        عرض التفاصيل
                      </Button>
                      <Button
                        onClick={() => handleReactivate(doctor)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <RotateCcw className="h-4 w-4" />
                        إعادة تفعيل
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          عرض {filteredDoctors.length} من أصل{" "}
          {suspendedDoctorsData?.totalDoctors ?? "-"} طبيب
        </p>
        <AdminPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
      <DoctorDetailsModal
        doctorId={showDetails}
        open={!!showDetails}
        onClose={() => setShowDetails(null)}
        fromAdmin={true}
      />
    </div>
  );
};

export default DoctorSuspendedTab;
