import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/utils/formatOperations";
import { Button } from "../ui/button";
import {
  Eye,
  AlertTriangle,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Award,
  Star,
  Clock,
  Ban,
} from "lucide-react";
import { useUpdateReportStatus } from "@/hooks/Actions/reports/useReportCruds";
import {
  useDoctorPendingAction,
  useGetDoctorDetails,
} from "@/hooks/Actions/doctors/useCrudsDoctors";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

function AdminReportRow({ report }) {
  const [showDoctorDetails, setShowDoctorDetails] = useState(false);
  const { mutate: updateReportStatus } = useUpdateReportStatus();
  const { mutate: updateDoctorStatus } = useDoctorPendingAction();
  const {
    data: doctorDataRes,
    refetch: refetchDoctor,
    isPending: isDoctorLoading,
  } = useGetDoctorDetails(report.doctor?._id);
  const doctor = doctorDataRes?.data?.data;

  const handleReview = () => {
    updateReportStatus({ data: { isReviewed: true }, id: report._id });
  };

  const handleSuspendDoctor = () => {
    if (report.doctor?._id) {
      updateDoctorStatus({
        data: {
          _id: report.doctor._id,
          doctorData: { currentStatus: "suspended" },
        },
        id: report.doctor._id,
      });
    }
  };

  const handleShowDoctorDetails = () => {
    setShowDoctorDetails(!showDoctorDetails);
    if (report.doctor?._id && !showDoctorDetails) {
      refetchDoctor();
    }
  };

  return (
    <TableRow>
      <TableCell>{report.patient.name || "-"}</TableCell>
      <TableCell>{report.doctor.name || "-"}</TableCell>
      <TableCell>{report.doctor?.email}</TableCell>
      <TableCell>{formatDate(new Date(report.createdAt))}</TableCell>
      <TableCell className={"flex justify-start"}>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="mx-2">
              <Eye />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl w-full max-h-[90vh] p-6 rounded-lg shadow-lg overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold mb-2">
                عرض البلاغ
              </DialogTitle>
              <DialogDescription className="mb-4 text-sm text-muted-foreground">
                تفاصيل البلاغ المقدم من المريض ضد الطبيب
              </DialogDescription>
            </DialogHeader>
            <div className="mb-4 space-y-4 max-h-[60vh] ">
              <div className="flex flex-col md:flex-row md:gap-8 gap-4 bg-gray-50 rounded-md p-4 border">
                <div className="flex-1">
                  <div className="font-semibold text-gray-700 mb-1">المريض</div>
                  <div className="text-base font-medium">
                    {report.patient?.name || "-"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {report.patient?.email || "-"}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-700 mb-1">الطبيب</div>
                  <div className="text-base font-medium">
                    {report.doctor?.name || "-"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {report.doctor?.email || "-"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-semibold">تاريخ البلاغ:</span>
                {formatDate(new Date(report.createdAt))}
              </div>
            </div>
            <hr className="my-4 border-gray-200" />
            <div>
              <div className="font-semibold mb-2 text-gray-700">نص البلاغ:</div>
              <div
                className="bg-gray-100 rounded-lg p-4 shadow-inner text-[15px] text-gray-900 max-h-64 overflow-y-auto whitespace-pre-wrap break-words font-sans"
                style={{ fontFamily: "inherit" }}
              >
                {report?.report || "لا توجد رسالة"}
              </div>
            </div>

            {/* Doctor Details Section */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="font-semibold text-gray-700">
                  تفاصيل الطبيب:
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShowDoctorDetails}
                  className="text-blue-600 border-blue-600 hover:bg-blue-50"
                >
                  <User className="h-4 w-4 mr-1" />
                  {showDoctorDetails
                    ? "إخفاء التفاصيل"
                    : "عرض التفاصيل الكاملة"}
                </Button>
              </div>

              {showDoctorDetails && (
                <>
                  {isDoctorLoading ? (
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 flex items-center justify-center">
                      <div className="flex items-center gap-2 text-blue-600">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        جاري تحميل تفاصيل الطبيب...
                      </div>
                    </div>
                  ) : doctor ? (
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 max-h-[50vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Personal Information */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                            <User className="h-4 w-4" />
                            المعلومات الشخصية
                          </h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Mail className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">
                                <span className="font-medium">
                                  البريد الإلكتروني:
                                </span>{" "}
                                {doctor.email}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">
                                <span className="font-medium">رقم الهاتف:</span>{" "}
                                {doctor.phone}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">
                                <span className="font-medium">
                                  تاريخ الميلاد:
                                </span>{" "}
                                {doctor.dateOfBirth
                                  ? new Date(
                                      doctor.dateOfBirth
                                    ).toLocaleDateString("ar-EG")
                                  : "-"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">
                                <span className="font-medium">
                                  موقع العيادة:
                                </span>{" "}
                                {doctor.doctorData?.clinicLocation || "-"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Professional Information */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                            <Award className="h-4 w-4" />
                            المؤهلات المهنية
                          </h4>
                          <div className="space-y-2">
                            <div>
                              <span className="text-sm font-medium">
                                التخصصات:
                              </span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {doctor.doctorData?.specializations?.length ? (
                                  doctor.doctorData.specializations.map(
                                    (spec, index) => (
                                      <span
                                        key={index}
                                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                      >
                                        {spec.name}
                                      </span>
                                    )
                                  )
                                ) : (
                                  <span className="text-muted-foreground text-xs">
                                    -
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">
                                <span className="font-medium">
                                  سنوات الخبرة:
                                </span>{" "}
                                {doctor.doctorData?.yearsOfExperience || 0}{" "}
                                سنوات
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">
                                <span className="font-medium">التقييم:</span>{" "}
                                {doctor.doctorData?.ratingNumber?.toFixed(1) ||
                                  "0.0"}{" "}
                                ({doctor.doctorData?.ratingCount || 0} تقييم)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bio */}
                      {doctor.doctorData?.bio && (
                        <div className="mt-4">
                          <h4 className="font-semibold text-gray-700 mb-2">
                            نبذة عن الطبيب:
                          </h4>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {doctor.doctorData.bio}
                          </p>
                        </div>
                      )}

                      {/* Additional Info */}
                      <div className="mt-4 grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2">
                            معلومات إضافية:
                          </h4>
                          <div className="space-y-1 text-sm">
                            <div>
                              <span className="font-medium">الجنس:</span>{" "}
                              {doctor.gender === "male"
                                ? "ذكر"
                                : doctor.gender === "female"
                                ? "أنثى"
                                : "-"}
                            </div>
                            <div>
                              <span className="font-medium">رصيد المحفظة:</span>{" "}
                              {doctor.walletBalance || 0} جنيه مصري
                            </div>
                            <div>
                              <span className="font-medium">عدد البلاغات:</span>{" "}
                              {doctor.doctorData?.reportsCount || 0}
                            </div>
                            <div>
                              <span className="font-medium">
                                تاريخ التسجيل:
                              </span>{" "}
                              {doctor.createdAt
                                ? new Date(doctor.createdAt).toLocaleDateString(
                                    "ar-EG"
                                  )
                                : "-"}
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2">
                            التصنيفات المقترحة:
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {doctor.doctorData?.suggestedCategory?.length ? (
                              doctor.doctorData.suggestedCategory.map(
                                (category, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                                  >
                                    {category}
                                  </span>
                                )
                              )
                            ) : (
                              <span className="text-muted-foreground text-xs">
                                لا توجد تصنيفات مقترحة
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 text-center text-red-600">
                      فشل في تحميل تفاصيل الطبيب
                    </div>
                  )}
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
        <div className="flex gap-2">
          {report?.isReviewed ? (
            <span className="inline-flex items-center text-green-600 font-semibold">
              <svg
                className="w-4 h-4 mr-1 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              تمت المراجعة
            </span>
          ) : (
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={handleReview}
            >
              تحديد كمُراجع
            </Button>
          )}
          <Button
            variant="destructive"
            className="bg-red-600 hover:bg-red-700"
            onClick={handleSuspendDoctor}
            disabled={!report.doctor?._id}
          >
            <Ban className="h-4 w-4 mr-1" />
            تعطيل الطبيب
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default AdminReportRow;
