import { X, Mail, Phone, Calendar } from "lucide-react";
import { createPortal } from "react-dom";

const PatientDetailsModal = ({ patient, open, onClose }) => {
  if (!open || !patient) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-bold">تفاصيل المريض</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-md transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={patient.userImg?.url || "/placeholder.svg"}
              alt={patient.name}
              className="w-16 h-16 rounded-full object-cover border"
            />
            <div>
              <h3 className="font-semibold text-lg mb-1">{patient.name}</h3>
              <p className="text-sm text-muted-foreground">{patient.email}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                رقم الهاتف
              </label>
              <p className="font-medium flex items-center gap-1">
                <Phone className="h-4 w-4" />
                {patient.phone}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                تاريخ الميلاد
              </label>
              <p className="font-medium flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(patient.dateOfBirth).toLocaleDateString("ar-SA")}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                تاريخ الإنشاء
              </label>
              <p className="font-medium flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(patient.createdAt).toLocaleDateString("ar-SA")}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                الجنس
              </label>
              <p className="font-medium">
                {patient.gender === "male" ? "ذكر" : "أنثى"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                تاريخ طبي
              </label>
              <p className="font-medium">
                {patient.patientData?.medicalHistory?.length > 0
                  ? patient.patientData.medicalHistory.join(", ")
                  : "لا يوجد سجل طبي"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PatientDetailsModal;
