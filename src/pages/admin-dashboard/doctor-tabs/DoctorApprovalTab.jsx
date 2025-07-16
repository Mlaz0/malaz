"use client";
import DoctorDetailsModal from "@/components/admin.components/DoctorDetailsModal";
import {
  useDeleteDoctor,
  useDoctorPendingAction,
  useGetApprovedDoctors,
  useGetPendingDoctors,
} from "@/hooks/Actions/doctors/useCrudsDoctors";
import {
  AlertCircle,
  Calendar,
  Check,
  Clock,
  Eye,
  Mail,
  MapPin,
  Phone,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";

const DoctorApprovalsTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [showDetails, setShowDetails] = useState(null);
  const { data: pendingDoctorsData, refetch } = useGetPendingDoctors();
  const { refetch: refetchApprovedDoctors } = useGetApprovedDoctors();
  const pendingRequests = pendingDoctorsData?.doctors || [];
  const { mutate: mutatePendingAction } = useDoctorPendingAction();
  const { mutate: mutateDeleteDoctor } = useDeleteDoctor();

  const filteredRequests = pendingRequests?.filter(
    (request) =>
      request.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // Search in all specializations' names
      request.doctorData?.specializations?.some((s) =>
        s.name?.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      request.phone?.startsWith(searchTerm)
  );

  //Handle selection
  const handleSelectRequest = (request) => {
    setSelectedRequests((prev) =>
      prev.includes(request)
        ? prev.filter((id) => id !== request)
        : [...prev, request]
    );
  };

  const handleSelectAll = () => {
    if (selectedRequests.length === filteredRequests.length) {
      setSelectedRequests([]);
    } else {
      setSelectedRequests(filteredRequests?.map((request) => request));
    }
  };

  //Handle actions for multi-requests
  const handleApproveAll = (requests) => {
    requests.forEach((request) => {
      mutatePendingAction(
        {
          data: {
            _id: request._id,
            doctorData: { ...request.doctorData, isApproved: true },
          },
          id: request._id,
        },
        {
          onSuccess: () => {
            refetch(); // Force refetch after mutation
            refetchApprovedDoctors();
          },
        }
      );
    });
  };

  const handleRejectAll = (requests) => {
    requests.forEach((request) => {
      mutateDeleteDoctor(
        {
          id: request._id,
        },
        {
          onSuccess: () => {
            refetch();
            refetchApprovedDoctors();
          },
        }
      );
    });
  };

  //Handle actions for single requests
  const handleApprove = (doctor) => {
    console.log("#############", doctor.doctorData);
    mutatePendingAction(
      {
        data: {
          _id: doctor._id,
          doctorData: { ...doctor.doctorData, isApproved: true },
        },
        id: doctor._id,
      },
      {
        onSuccess: () => {
          refetch();
          refetchApprovedDoctors();
        },
      }
    );
  };

  const handleReject = (requestId) => {
    mutateDeleteDoctor({
      id: requestId,
    });
  };

  const getDocumentStatus = (verified) => {
    return verified ? (
      <Check className="h-4 w-4 text-green-500" />
    ) : (
      <AlertCircle className="h-4 w-4 text-yellow-500" />
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="البحث في الطلبات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex gap-2">
          {selectedRequests.length > 0 && (
            <>
              <button
                onClick={() => handleApproveAll(selectedRequests)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <Check className="h-4 w-4" />
                موافقة ({selectedRequests.length})
              </button>
              <button
                onClick={() => handleRejectAll(selectedRequests)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <X className="h-4 w-4" />
                رفض ({selectedRequests.length})
              </button>
            </>
          )}
        </div>
      </div>

      {/* Requests Table */}
      <div className="card-modern rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-right py-3 px-4">
                  <input
                    type="checkbox"
                    checked={
                      selectedRequests.length === filteredRequests.length &&
                      filteredRequests.length > 0
                    }
                    onChange={handleSelectAll}
                    className="rounded border-gray-300"
                  />
                </th>
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
                  تاريخ التقديم
                </th>
                {/* الأولوية column removed */}
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                  الوثائق
                </th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredRequests?.map((doctor) => (
                <tr
                  key={doctor._id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="py-4 px-4">
                    <input
                      type="checkbox"
                      checked={selectedRequests.includes(doctor)}
                      onChange={() => handleSelectRequest(doctor)}
                      className="rounded border-gray-300"
                    />
                  </td>
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
                        <p className="font-medium">{doctor.name}</p>
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
                      {doctor.doctorData?.specializations
                        ?.map((s) => s.name)
                        .join(", ")}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {doctor.doctorData?.clinicLocation}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {/* You may need to calculate experience or display another field */}
                    <span className="font-medium">
                      {doctor.doctorData?.yearsOfExperience ?? "-"}
                    </span>
                    <div className="text-sm text-muted-foreground">
                      {/* university field if available */}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {new Date(doctor.createdAt).toLocaleDateString("ar-SA")}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {/* days since submission */}
                      منذ{" "}
                      {Math.floor(
                        (new Date() - new Date(doctor.createdAt)) /
                          (1000 * 60 * 60 * 24)
                      )}{" "}
                      يوم
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 ">
                      <span className="text-sm text-muted-foreground ">
                        {doctor.doctorData?.certifications?.length}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setShowDetails(
                            showDetails === doctor._id ? null : doctor._id
                          )
                        }
                        className="p-2 hover:bg-accent rounded-md transition-colors"
                        title="عرض التفاصيل"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleApprove(doctor)}
                        className="p-2 hover:bg-green-100 text-green-600 rounded-md transition-colors"
                        title="موافقة"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleReject(doctor._id)}
                        className="p-2 hover:bg-red-100 text-red-600 rounded-md transition-colors"
                        title="رفض"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Request Details Modal */}
      <DoctorDetailsModal
        doctor={pendingRequests.find((r) => r._id === showDetails)}
        open={!!showDetails}
        onClose={() => setShowDetails(null)}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          عرض {filteredRequests.length} من أصل {pendingRequests.length} طلب معلق
        </p>
      </div>
    </div>
  );
};

export default DoctorApprovalsTab;
