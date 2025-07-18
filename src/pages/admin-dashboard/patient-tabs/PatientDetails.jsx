import { useOutletContext } from "react-router-dom";

function PatientDetails() {
  const { patient } = useOutletContext();
  console.log("PatientDetails component rendered with patient:", patient);
  if (!patient) return <div>يرجى اختيار مريض لعرض التفاصيل</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">تفاصيل المريض</h1>
      <div className="flex items-center gap-4 mb-4">
        <img
          src={patient.userImg?.url || "/placeholder.svg"}
          alt={patient.name}
          className="w-16 h-16 rounded-full object-cover border"
        />
        <div>
          <h2 className="font-semibold text-lg mb-1">{patient.name}</h2>
          <p className="text-sm text-muted-foreground">{patient.email}</p>
        </div>
      </div>
      <div className="space-y-2">
        <div>
          <span className="font-medium">رقم الهاتف: </span>
          {patient.phone}
        </div>
        <div>
          <span className="font-medium">تاريخ الميلاد: </span>
          {new Date(patient.dateOfBirth).toLocaleDateString("ar-SA")}
        </div>
        <div>
          <span className="font-medium">الجنس: </span>
          {patient.gender === "male" ? "ذكر" : "أنثى"}
        </div>
        <div>
          <span className="font-medium">تاريخ الإنشاء: </span>
          {new Date(patient.createdAt).toLocaleDateString("ar-SA")}
        </div>
        <div>
          <span className="font-medium">تاريخ طبي: </span>
          {patient.patientData?.medicalHistory?.length > 0
            ? patient.patientData.medicalHistory.join(", ")
            : "لا يوجد سجل طبي"}
        </div>
      </div>
    </div>
  );
}

export default PatientDetails;
