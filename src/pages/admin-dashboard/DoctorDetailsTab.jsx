import {
  useDoctorPendingAction,
  useGetApprovedDoctors,
} from "@/hooks/Actions/doctors/useCrudsDoctors";
import {
  CheckCircle,
  Edit,
  Eye,
  Filter,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  Search,
  Star,
  Trash2,
  XCircle,
} from "lucide-react";
import DoctorDetailsModal from "@/components/admin.components/DoctorDetailsModal";
import { useState } from "react";
import React from "react";

const PAGE_SIZE = 10;

const DoctorDetailsTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDetails, setShowDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: approvedDoctorsData, refetch } = useGetApprovedDoctors();
  const doctors = approvedDoctorsData?.doctors || [];
  const { mutate: mutatePendingAction } = useDoctorPendingAction();

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

  // Pagination logic
  const totalDoctors = filteredDoctors.length;
  const totalPages = Math.ceil(totalDoctors / PAGE_SIZE) || 1;
  const paginatedDoctors = filteredDoctors.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleDelete = (id) => {
    mutatePendingAction(
      {
        data: { _id: id, doctorData: { isApproved: false } },
        id: id,
      },
      {
        onSuccess: () => {
          refetch(); // Force refetch after mutation
        },
      }
    );
  };

  // Reset to page 1 if search changes
  React.useEffect(() => {
    setCurrentPage(1);
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
                  المرضى
                </th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedDoctors.map((doctor) => (
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
                          {doctor.doctorData?.isApproved && (
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
                    <div className="text-center">
                      <div className="font-medium">-</div>
                      <div className="text-xs text-muted-foreground">-</div>
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
                      <button
                        onClick={() => handleDelete(doctor._id)}
                        className="flex items-center gap-1 px-3 py-1 text-sm border border-input rounded text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                        تعطيل
                      </button>
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
          عرض {paginatedDoctors.length} من أصل {totalDoctors} طبيب
        </p>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 border border-input rounded hover:bg-accent transition-colors"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            السابق
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              className={`px-3 py-1 rounded ${
                currentPage === idx + 1
                  ? "bg-primary text-primary-foreground"
                  : "border border-input hover:bg-accent transition-colors"
              }`}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 border border-input rounded hover:bg-accent transition-colors"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            التالي
          </button>
        </div>
      </div>
      <DoctorDetailsModal
        doctor={doctors.find((d) => d._id === showDetails)}
        open={!!showDetails}
        onClose={() => setShowDetails(null)}
      />
    </div>
  );
};

export default DoctorDetailsTab;
