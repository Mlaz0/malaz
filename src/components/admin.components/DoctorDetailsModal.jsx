import {
  X,
  Check,
  FileText,
  Download,
  AlertCircle,
  Star,
  Clock,
  MapPin,
  User,
  Mail,
  Phone,
  Calendar,
  Award,
} from "lucide-react";
import { createPortal } from "react-dom";
import DocProfilePracticeDetails from "../layout/dashboard/doctor-dashboard/DoctorProfile/DocProfilePracticeDetails";
import { useGetDoctorDetails } from "@/hooks/Actions/doctors/useCrudsDoctors";
import { useEffect } from "react";

export default function DoctorDetailsModal({
  doctorId,
  open,
  onClose,
  onApprove,
  onReject,
}) {
  const { data: doctorDataRes, refetch } = useGetDoctorDetails(doctorId);
  const doctor = doctorDataRes?.data?.data;
  const isApproved = !(onApprove || onReject);
  useEffect(() => {
    refetch();
  }, [doctorId]);

  if (!open || !doctorId) return null;

  const getDocumentStatus = (verified) =>
    verified ? (
      <Check className="h-4 w-4 text-green-500" />
    ) : (
      <AlertCircle className="h-4 w-4 text-yellow-500" />
    );

  const getStatusBadge = (status) => {
    const statusConfig = {
      approved: { color: "bg-green-100 text-green-800", text: "موافق" },
      pending: { color: "bg-yellow-100 text-yellow-800", text: "في الانتظار" },
      suspended: { color: "bg-red-100 text-red-800", text: "معلق" },
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.text}
      </span>
    );
  };

  const modalContent = (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-bold">تفاصيل الطبيب</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-md transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          {/* Header with Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={doctor.userImg?.url || "/placeholder.svg"}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                {doctor.isEmailVerified && (
                  <Check className="absolute -bottom-1 -right-1 h-4 w-4 text-green-500 bg-white rounded-full" />
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold">{doctor.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  {getStatusBadge(doctor.doctorData?.currentStatus)}
                  <span className="text-sm text-muted-foreground">
                    {doctor.doctorData?.statusMessage}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                المعلومات الشخصية
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      البريد الإلكتروني
                    </label>
                    <p className="font-medium">{doctor.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      رقم الهاتف
                    </label>
                    <p className="font-medium">{doctor.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      تاريخ الميلاد
                    </label>
                    <p className="font-medium">
                      {doctor.dateOfBirth
                        ? new Date(doctor.dateOfBirth).toLocaleDateString(
                            "ar-EG"
                          )
                        : "-"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      موقع العيادة
                    </label>
                    <p className="font-medium">
                      {doctor.doctorData?.clinicLocation || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Award className="h-5 w-5" />
                المؤهلات المهنية
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    التخصصات
                  </label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {doctor.doctorData?.specializations?.length ? (
                      doctor.doctorData.specializations.map((spec, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {spec.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      سنوات الخبرة
                    </label>
                    <p className="font-medium">
                      {doctor.doctorData?.yearsOfExperience || 0} سنوات
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      التقييم
                    </label>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">
                        {doctor.doctorData?.ratingNumber?.toFixed(1) || "0.0"}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ({doctor.doctorData?.ratingCount || 0} تقييم)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Session Fees */}
          {doctor.doctorData?.sessionFee?.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Clock className="h-5 w-5" />
                أسعار الجلسات
              </h3>
              <div className="grid gap-3">
                {doctor.doctorData.sessionFee.map((session, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border border-border rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{session.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-green-600">
                        {session.price} جنيه مصري
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bio */}
          {doctor.doctorData?.bio && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">نبذة عن الطبيب</h3>
              <p className="text-muted-foreground leading-relaxed">
                {doctor.doctorData.bio}
              </p>
            </div>
          )}

          {/* Additional Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">معلومات إضافية</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    الجنس
                  </label>
                  <p className="font-medium">
                    {doctor.gender === "male"
                      ? "ذكر"
                      : doctor.gender === "female"
                      ? "أنثى"
                      : "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    رصيد المحفظة
                  </label>
                  <p className="font-medium">
                    {doctor.walletBalance || 0} جنيه مصري
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    عدد البلاغات
                  </label>
                  <p className="font-medium">
                    {doctor.doctorData?.reportsCount || 0}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    تاريخ التسجيل
                  </label>
                  <p className="font-medium">
                    {doctor.createdAt
                      ? new Date(doctor.createdAt).toLocaleDateString("ar-EG")
                      : "-"}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">التصنيفات المقترحة</h3>
              <div className="flex flex-wrap gap-2">
                {doctor.doctorData?.suggestedCategory?.length ? (
                  doctor.doctorData.suggestedCategory.map((category, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
                    >
                      {category}
                    </span>
                  ))
                ) : (
                  <span className="text-muted-foreground">
                    لا توجد تصنيفات مقترحة
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* Documents */}
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              الشهادات والوثائق
            </h3>
            <div className="grid gap-3">
              {doctor.doctorData?.certifications?.length > 0 ? (
                doctor.doctorData.certifications.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border border-border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">شهادة {index + 1}</p>
                        <p className="text-sm text-muted-foreground">
                          {doc.type} • {doc.public_id ? "مرفوع" : "غير مرفوع"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {doc.url && (
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1 text-sm border border-input rounded hover:bg-accent transition-colors"
                        >
                          <FileText className="h-3 w-3" />
                          معاينة
                        </a>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">لا يوجد شهادات مرفقة</p>
              )}
            </div>
          </div>
          {isApproved && (
            <DocProfilePracticeDetails fromAdmin={true} doctorData={doctor} />
          )}

          {/* Actions (Approve/Reject only if handlers provided) */}
          {!isApproved && (
            <div className="flex gap-4 pt-4 border-t border-border">
              {onApprove && (
                <button
                  onClick={() => onApprove(doctor._id)}
                  className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  <Check className="h-4 w-4" />
                  موافقة على الطلب
                </button>
              )}
              {onReject && (
                <button
                  onClick={() => onReject(doctor._id)}
                  className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  <X className="h-4 w-4" />
                  رفض الطلب
                </button>
              )}
              <button
                onClick={onClose}
                className="px-6 py-2 border border-input rounded-md hover:bg-accent transition-colors"
              >
                إغلاق
              </button>
            </div>
          )}
          {/* If no approve/reject, just show close button at bottom */}
          {!(onApprove || onReject) && (
            <div className="flex justify-end pt-4 border-t border-border">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-input rounded-md hover:bg-accent transition-colors"
              >
                إغلاق
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
