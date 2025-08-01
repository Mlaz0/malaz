import {
  useDoctorPendingAction,
  useGetApprovedDoctors,
  useGetPendingDoctors,
} from "@/hooks/Actions/doctors/useCrudsDoctors";
import {
  Ban,
  CheckCircle,
  Eye,
  Mail,
  MapPin,
  Phone,
  Search,
  Star,
} from "lucide-react";
import DoctorDetailsModal from "@/components/admin.components/DoctorDetailsModal";
import AdminPagination from "@/components/admin.components/AdminPagination";
import { useState } from "react";
import React from "react";
import { Button } from "@/components/ui/button";

const DoctorDetailsTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDetails, setShowDetails] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data: getApprovedDoctors, refetch } = useGetApprovedDoctors(
    page,
    limit
  );
  const approvedDoctorsData = getApprovedDoctors?.data?.data;
  const doctors = approvedDoctorsData?.doctors || [];
  const currentPage = approvedDoctorsData?.currentPage || 1;
  const totalPages = approvedDoctorsData?.totalPages || 1;
  const { refetch: refetchPendingDoctors } = useGetPendingDoctors();
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

  const handleDisable = (doctor) => {
    mutatePendingAction(
      {
        data: {
          _id: doctor._id,
          doctorData: { currentStatus: "suspended" },
        },
        id: doctor._id,
      },
      {
        onSuccess: () => {
          refetch(); // Force refetch after mutation
          refetchPendingDoctors();
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
                          {doctor.doctorData?.currentStatus === "approved" && (
                            <CheckCircle
                              className="h-4 w-4 text-blue-500"
                              title="موثق"
                            />
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
                      <button
                        onClick={() => setShowDetails(doctor._id)}
                        className="flex items-center gap-1 px-3 py-1 text-sm border border-input rounded hover:bg-accent transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                        عرض التفاصيل
                      </button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDisable(doctor)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        <Ban className="h-4 w-4" />
                        تعطيل
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
          {approvedDoctorsData?.totalDoctors ?? "-"} طبيب
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

export default DoctorDetailsTab;
