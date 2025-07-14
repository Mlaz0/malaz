"use client";
import { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Check,
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Download,
  Clock,
  AlertCircle,
} from "lucide-react";

const DoctorApprovalsTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [showDetails, setShowDetails] = useState(null);

  const pendingRequests = [
    {
      id: 1,
      name: "د. خالد عبدالرحمن",
      email: "khalid.abdulrahman@email.com",
      phone: "+966501111111",
      specialty: "الطب النفسي",
      experience: "6 سنوات",
      university: "جامعة الملك سعود",
      degree: "دكتوراه في الطب النفسي",
      licenseNumber: "PSY-2023-001",
      submissionDate: "2024-01-15",
      location: "الرياض، السعودية",
      avatar: "/placeholder.svg?height=40&width=40",
      documents: [
        { name: "الشهادة الجامعية", type: "pdf", verified: true },
        { name: "رخصة مزاولة المهنة", type: "pdf", verified: true },
        { name: "السيرة الذاتية", type: "pdf", verified: false },
      ],
      status: "pending",
      priority: "high",
    },
    {
      id: 2,
      name: "د. ليلى محمد",
      email: "layla.mohamed@email.com",
      phone: "+966502222222",
      specialty: "علم النفس السريري",
      experience: "4 سنوات",
      university: "جامعة الملك عبدالعزيز",
      degree: "ماجستير في علم النفس السريري",
      licenseNumber: "PSY-2023-002",
      submissionDate: "2024-01-18",
      location: "جدة، السعودية",
      avatar: "/placeholder.svg?height=40&width=40",
      documents: [
        { name: "الشهادة الجامعية", type: "pdf", verified: true },
        { name: "رخصة مزاولة المهنة", type: "pdf", verified: false },
        { name: "السيرة الذاتية", type: "pdf", verified: true },
      ],
      status: "pending",
      priority: "medium",
    },
    {
      id: 3,
      name: "د. عمر الأحمد",
      email: "omar.alahmad@email.com",
      phone: "+966503333333",
      specialty: "الإرشاد النفسي",
      experience: "8 سنوات",
      university: "جامعة الإمام محمد بن سعود",
      degree: "دكتوراه في الإرشاد النفسي",
      licenseNumber: "PSY-2023-003",
      submissionDate: "2024-01-20",
      location: "الدمام، السعودية",
      avatar: "/placeholder.svg?height=40&width=40",
      documents: [
        { name: "الشهادة الجامعية", type: "pdf", verified: true },
        { name: "رخصة مزاولة المهنة", type: "pdf", verified: true },
        { name: "السيرة الذاتية", type: "pdf", verified: true },
      ],
      status: "pending",
      priority: "low",
    },
  ];

  const filteredRequests = pendingRequests.filter(
    (request) =>
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectRequest = (requestId) => {
    setSelectedRequests((prev) =>
      prev.includes(requestId)
        ? prev.filter((id) => id !== requestId)
        : [...prev, requestId]
    );
  };

  const handleSelectAll = () => {
    if (selectedRequests.length === filteredRequests.length) {
      setSelectedRequests([]);
    } else {
      setSelectedRequests(filteredRequests.map((request) => request.id));
    }
  };

  const handleApprove = (requestId) => {
    console.log(`Approving request: ${requestId}`);
    // Handle approval logic
  };

  const handleReject = (requestId) => {
    console.log(`Rejecting request: ${requestId}`);
    // Handle rejection logic
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk ${action} for requests:`, selectedRequests);
    // Handle bulk actions
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            عالية
          </span>
        );
      case "medium":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            متوسطة
          </span>
        );
      case "low":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            منخفضة
          </span>
        );
      default:
        return null;
    }
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
                onClick={() => handleBulkAction("approve")}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <Check className="h-4 w-4" />
                موافقة ({selectedRequests.length})
              </button>
              <button
                onClick={() => handleBulkAction("reject")}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <X className="h-4 w-4" />
                رفض ({selectedRequests.length})
              </button>
            </>
          )}

          <button className="flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent transition-colors">
            <Filter className="h-4 w-4" />
            تصفية
          </button>
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
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                  الأولوية
                </th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                  الوثائق
                </th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredRequests.map((request) => (
                <tr
                  key={request.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="py-4 px-4">
                    <input
                      type="checkbox"
                      checked={selectedRequests.includes(request.id)}
                      onChange={() => handleSelectRequest(request.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                        <img
                          className="aspect-square h-full w-full"
                          src={request.avatar || "/placeholder.svg"}
                          alt={request.name}
                        />
                      </div>
                      <div>
                        <p className="font-medium">{request.name}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {request.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {request.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium">{request.specialty}</span>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {request.location}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium">{request.experience}</span>
                    <div className="text-sm text-muted-foreground">
                      {request.university}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {new Date(request.submissionDate).toLocaleDateString(
                          "ar-SA"
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      منذ{" "}
                      {Math.floor(
                        (new Date() - new Date(request.submissionDate)) /
                          (1000 * 60 * 60 * 24)
                      )}{" "}
                      يوم
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {getPriorityBadge(request.priority)}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {request.documents.map((doc, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1"
                          title={doc.name}
                        >
                          {getDocumentStatus(doc.verified)}
                        </div>
                      ))}
                      <span className="text-sm text-muted-foreground">
                        ({request.documents.filter((d) => d.verified).length}/
                        {request.documents.length})
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setShowDetails(
                            showDetails === request.id ? null : request.id
                          )
                        }
                        className="p-2 hover:bg-accent rounded-md transition-colors"
                        title="عرض التفاصيل"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="p-2 hover:bg-green-100 text-green-600 rounded-md transition-colors"
                        title="موافقة"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
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
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">تفاصيل طلب الموافقة</h2>
                <button
                  onClick={() => setShowDetails(null)}
                  className="p-2 hover:bg-accent rounded-md transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {(() => {
              const request = pendingRequests.find((r) => r.id === showDetails);
              if (!request) return null;

              return (
                <div className="p-6 space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">
                        المعلومات الشخصية
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            الاسم الكامل
                          </label>
                          <p className="font-medium">{request.name}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            البريد الإلكتروني
                          </label>
                          <p className="font-medium">{request.email}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            رقم الهاتف
                          </label>
                          <p className="font-medium">{request.phone}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            الموقع
                          </label>
                          <p className="font-medium">{request.location}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">
                        المؤهلات المهنية
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            التخصص
                          </label>
                          <p className="font-medium">{request.specialty}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            سنوات الخبرة
                          </label>
                          <p className="font-medium">{request.experience}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            الجامعة
                          </label>
                          <p className="font-medium">{request.university}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            الدرجة العلمية
                          </label>
                          <p className="font-medium">{request.degree}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            رقم الترخيص
                          </label>
                          <p className="font-medium">{request.licenseNumber}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Documents */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">
                      الوثائق المرفقة
                    </h3>
                    <div className="grid gap-3">
                      {request.documents.map((doc, index) => (
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
                            <button className="flex items-center gap-1 px-3 py-1 text-sm border border-input rounded hover:bg-accent transition-colors">
                              <Download className="h-3 w-3" />
                              تحميل
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4 pt-4 border-t border-border">
                    <button
                      onClick={() => {
                        handleApprove(request.id);
                        setShowDetails(null);
                      }}
                      className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      <Check className="h-4 w-4" />
                      موافقة على الطلب
                    </button>
                    <button
                      onClick={() => {
                        handleReject(request.id);
                        setShowDetails(null);
                      }}
                      className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      <X className="h-4 w-4" />
                      رفض الطلب
                    </button>
                    <button
                      onClick={() => setShowDetails(null)}
                      className="px-6 py-2 border border-input rounded-md hover:bg-accent transition-colors"
                    >
                      إغلاق
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          عرض {filteredRequests.length} من أصل {pendingRequests.length} طلب معلق
        </p>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-100"></div>
            أولوية عالية:{" "}
            {pendingRequests.filter((r) => r.priority === "high").length}
          </span>
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-100"></div>
            أولوية متوسطة:{" "}
            {pendingRequests.filter((r) => r.priority === "medium").length}
          </span>
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-100"></div>
            أولوية منخفضة:{" "}
            {pendingRequests.filter((r) => r.priority === "low").length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DoctorApprovalsTab;
