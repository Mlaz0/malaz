import { useState } from "react";
import { Mail, Phone, Calendar, Search, Eye, X } from "lucide-react";
import PatientDetailsModal from "@/components/admin.components/PatientDetailsModal";

const AdminPatientsTable = ({
  patients = [],
  toggleDetails,
  currentPatient,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showPatientId, setShowPatientId] = useState(null);

  // Filter patients by name, email, or phone
  const filteredPatients = patients.filter(
    (patient) =>
      patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowPatient = (patient) => {
    setShowPatientId(patient._id);
  };

  return (
    <div className="card-modern rounded-lg overflow-hidden">
      {/* Search Input */}
      <div className="p-4 border-b border-border flex items-center justify-start">
        <div className="relative w-full max-w-xs">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="بحث عن مريض..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                المريض
              </th>
              <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                البريد الإلكتروني
              </th>
              <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                رقم الهاتف
              </th>
              <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                تاريخ الإنشاء
              </th>
              <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredPatients.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-8 text-center text-muted-foreground"
                >
                  لا يوجد مرضى
                </td>
              </tr>
            ) : (
              filteredPatients.map((patient) => (
                <tr
                  key={patient._id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="py-4 px-4 font-medium">{patient.name}</td>
                  <td className="py-4 px-4">
                    <span className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {patient.email}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      {patient.phone}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(patient.createdAt).toLocaleDateString("ar-SA")}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => toggleDetails(patient)}
                      className={`${
                        currentPatient?._id === patient._id ? "bg-accent" : ""
                      } flex items-center gap-1 px-3 py-1 text-sm border border-input rounded hover:bg-accent transition-colors`}
                    >
                      <Eye className="h-4 w-4" />
                      عرض التفاصيل
                    </button>
                  </td>
                  {/* Patient Details Modal */}
                  <PatientDetailsModal
                    patient={filteredPatients.find(
                      (p) => p._id === showPatientId
                    )}
                    open={!!showPatientId}
                    onClose={() => setShowPatientId(null)}
                  />
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPatientsTable;
