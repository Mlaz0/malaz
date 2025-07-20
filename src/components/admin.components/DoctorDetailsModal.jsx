import { X, Check, FileText, Download, AlertCircle } from "lucide-react";
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
  }),
    [doctorId];

  if (!open || !doctorId) return null;

  const getDocumentStatus = (verified) =>
    verified ? (
      <Check className="h-4 w-4 text-green-500" />
    ) : (
      <AlertCircle className="h-4 w-4 text-yellow-500" />
    );

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
          {/* Personal Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">المعلومات الشخصية</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    الاسم الكامل
                  </label>
                  <p className="font-medium">{doctor.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    البريد الإلكتروني
                  </label>
                  <p className="font-medium">{doctor.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    رقم الهاتف
                  </label>
                  <p className="font-medium">{doctor.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    الموقع
                  </label>
                  <p className="font-medium">
                    {doctor.doctorData?.clinicLocation ||
                      doctor.location ||
                      "-"}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">المؤهلات المهنية</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    التخصص
                  </label>
                  <p className="font-medium">
                    {doctor.doctorData?.specializations?.length
                      ? doctor.doctorData.specializations
                          .map((s) => s.name)
                          .join(", ")
                      : "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    سنوات الخبرة
                  </label>
                  <p className="font-medium">
                    {doctor.doctorData?.yearsOfExperience ?? "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Documents */}
          <div>
            <h3 className="font-semibold text-lg mb-4">الوثائق المرفقة</h3>
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
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">
                          PDF • {doc.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getDocumentStatus(doc.verified)}
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1 text-sm border border-input rounded hover:bg-accent transition-colors"
                      >
                        <FileText className="h-3 w-3" />
                        معاينة
                      </a>
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
