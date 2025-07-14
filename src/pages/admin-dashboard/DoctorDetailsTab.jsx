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
import { useState } from "react";

const DoctorDetailsTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showActions, setShowActions] = useState(null);

  const doctors = [
    {
      id: 1,
      name: "د. أحمد محمد علي",
      email: "ahmed.mohamed@email.com",
      phone: "+966501234567",
      specialty: "الطب النفسي",
      experience: "8 سنوات",
      rating: 4.9,
      patients: 156,
      sessions: 1240,
      status: "active",
      joinDate: "2023-01-15",
      location: "الرياض، السعودية",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    {
      id: 2,
      name: "د. فاطمة أحمد",
      email: "fatima.ahmed@email.com",
      phone: "+966507654321",
      specialty: "علم النفس السريري",
      experience: "12 سنة",
      rating: 4.8,
      patients: 203,
      sessions: 1890,
      status: "active",
      joinDate: "2022-08-20",
      location: "جدة، السعودية",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    {
      id: 3,
      name: "د. محمد السعيد",
      email: "mohamed.alsaeed@email.com",
      phone: "+966509876543",
      specialty: "الإرشاد النفسي",
      experience: "5 سنوات",
      rating: 4.7,
      patients: 89,
      sessions: 567,
      status: "inactive",
      joinDate: "2023-06-10",
      location: "الدمام، السعودية",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    {
      id: 4,
      name: "د. نورا عبدالله",
      email: "nora.abdullah@email.com",
      phone: "+966502468135",
      specialty: "طب نفس الأطفال",
      experience: "10 سنوات",
      rating: 4.9,
      patients: 178,
      sessions: 1456,
      status: "active",
      joinDate: "2022-03-05",
      location: "الرياض، السعودية",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
  ];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || doctor.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 ml-1" />
            نشط
          </span>
        );
      case "inactive":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 ml-1" />
            غير نشط
          </span>
        );
      default:
        return null;
    }
  };

  const handleAction = (action, doctorId) => {
    console.log(`${action} doctor with ID: ${doctorId}`);
    setShowActions(null);
  };

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

        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">جميع الحالات</option>
            <option value="active">نشط</option>
            <option value="inactive">غير نشط</option>
          </select>

          <button className="flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent transition-colors">
            <Filter className="h-4 w-4" />
            تصفية
          </button>
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
                  الحالة
                </th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredDoctors.map((doctor) => (
                <tr
                  key={doctor.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                        <img
                          className="aspect-square h-full w-full"
                          src={doctor.avatar || "/placeholder.svg"}
                          alt={doctor.name}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{doctor.name}</p>
                          {doctor.verified && (
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
                    <span className="font-medium">{doctor.specialty}</span>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {doctor.location}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium">{doctor.experience}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{doctor.rating}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-center">
                      <div className="font-medium">{doctor.patients}</div>
                      <div className="text-xs text-muted-foreground">
                        {doctor.sessions} جلسة
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">{getStatusBadge(doctor.status)}</td>
                  <td className="py-4 px-4">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setShowActions(
                            showActions === doctor.id ? null : doctor.id
                          )
                        }
                        className="p-2 hover:bg-accent rounded-md transition-colors"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>

                      {showActions === doctor.id && (
                        <div className="absolute left-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-10">
                          <div className="py-1">
                            <button
                              onClick={() => handleAction("view", doctor.id)}
                              className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent"
                            >
                              <Eye className="h-4 w-4" />
                              عرض التفاصيل
                            </button>
                            <button
                              onClick={() => handleAction("edit", doctor.id)}
                              className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent"
                            >
                              <Edit className="h-4 w-4" />
                              تعديل
                            </button>
                            <button
                              onClick={() => handleAction("message", doctor.id)}
                              className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent"
                            >
                              <Mail className="h-4 w-4" />
                              إرسال رسالة
                            </button>
                            <div className="border-t border-border my-1"></div>
                            <button
                              onClick={() => handleAction("delete", doctor.id)}
                              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                              حذف
                            </button>
                          </div>
                        </div>
                      )}
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
          عرض {filteredDoctors.length} من أصل {doctors.length} طبيب
        </p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border border-input rounded hover:bg-accent transition-colors">
            السابق
          </button>
          <button className="px-3 py-1 bg-primary text-primary-foreground rounded">
            1
          </button>
          <button className="px-3 py-1 border border-input rounded hover:bg-accent transition-colors">
            2
          </button>
          <button className="px-3 py-1 border border-input rounded hover:bg-accent transition-colors">
            التالي
          </button>
        </div>
      </div>

      {/* Click outside to close actions */}
      {showActions && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setShowActions(null)}
        />
      )}
    </div>
  );
};

export default DoctorDetailsTab;
